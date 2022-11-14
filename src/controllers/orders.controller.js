import __dirname from "../dirname.js";
import ordersService from "../services/orders.service.js";
import cartsService from "../services/carts.service.js";
import WSresponse from "../libs/WSresponse.js";
import mailer from "../utils/mailer.js";
import twilioClient from "../utils/twilioClient.js";
import config from "../config/config.js";
import logger from "../utils/logger.js";

const newOrder = async (req, res) => {
  try{
    //Obtenemos los productos del carrito.
    //Usamos el cartsService.getProducts porque este ya realiza la validación de stock.
    const idCart = req.user.currentCart;
    const orderProducts = await cartsService.getProducts(idCart);

    if (!orderProducts.length) return res.status(400).json(new WSresponse(null, 'No se pueden enviar ordenes vacías!', true));

    //Creamos la orden.
    const order = await ordersService.createOrder(orderProducts, req.user.email);

    //Si la orden se crea correctamente (no lanza ningún error), borramos carrito.
    await cartsService.deleteById(idCart, req.user.id, req.user.email);


    //Envío de mail con los datos del nuevo pedido.
    const mailOptions = {
      from: 'Proyecto backend | Server Node.js',
      to: config.TEST_MAIL,
      subject: `Nuevo pedido de ${req.user.firstName} (${req.user.email})`,
      html: `<h1 style="color: yellow;"> ¡NUEVO PEDIDO RECIBIDO! </h1>
      <h3 style="color: blue"> Datos del USUARIO </h3>
      <p>Email: ${order.email}</p>
      <p>Nombre: ${req.user.firstName} ${req.user.lastName}</p>
      <p>Tel: ${req.user.tel}</p>
      <br>
      <h3 style="color: blue"> Datos de FACTURACION Y ENVIO </h3>
      <p>Orden #${order._id}</p>
      <p>${JSON.stringify(req.body, null, 2)}</p>
      <br>
      <h2 style="color: blue"> Productos en la orden </h2>
      <ul>
        ${order.productos.map(prod =>{
          return `<li>Nombre: ${prod.nombre} | Precio unitario: ${prod.precio} | Cantidad: ${prod.quantity} | Total: ${prod.precio * prod.quantity}</li>
          `
        }).join("")}
      </ul>
      <p>TOTAL DE LA ORDEN: ${order.productos.reduce((acc, act) => acc + act.precio * act.quantity, 0)}</p>
      `
    }

    //Envio de WhatsApp a admin con la información del pedido.
    const wspOptions = {
      body: `Nuevo pedido de ${req.user.firstName} (${req.user.email})

      *Datos del USUARIO*:
      -Email: ${req.user.email}
      -Nombre: ${req.user.firstName} ${req.user.lastName}
      -Tel: ${req.user.tel}

      *Datos de FACTURACION Y ENVIO*
      -Orden #${order._id}
      ${JSON.stringify(req.body, null, 2)}

      *Productos en la orden*
        ${order.productos.map(prod =>{
          return `- Nombre: ${prod.nombre} | Precio unitario: ${prod.precio} | Cantidad: ${prod.quantity} | Total: ${prod.precio * prod.quantity}`
        }).join("\n")}

      *TOTAL DE LA ORDEN: ${order.productos.reduce((acc, act) => acc + act.precio * act.quantity, 0)}*
      `,
      from: `whatsapp:${config.twilioWhatsappFrom}`,
      to: `whatsapp:${config.twilioWhatsappTo}`
    }

    //Envio de SMS al cliente (Con twilio en version de prueba solo se puede enviara numeros verificados... Por eso no se pasa el del cliente como deberia ser).
    const smsOptions = {
      body: `Hola, ${req.user.firstName}. Su orden #${order._id} ha sido recibida y se encuentra en proceso.`,
      from: config.twilioSMSFrom,
      to: config.twilioSMSTo //`+54${req.body.fac_tel || req.user.tel}`
    }

    try {
        await mailer.sendMail(mailOptions);
        await twilioClient.messages.create(wspOptions);
        await twilioClient.messages.create(smsOptions);
    } catch (error) {
        logger.warn(error);
    }
    
    //Devolvemos al cliente los datos de la orden.
    res.status(201).json(new WSresponse(order, `Orden #${order._id} enviada, espere a ser contactado por alguno de nuestros agentes de ventas!`));

  } catch (error) {
    return res.status(error.status || 500).json(new WSresponse(null, error.message, true));
  }
};

const getOrdersByEmail = async (req, res) =>{
  try {
    const email = req.params.email;
    const data = await ordersService.getOrdersByEmail(email);
    res.status(200).json(new WSresponse(data, "success"));
  } catch (error) {
      return res.status(error.status || 500).json(new WSresponse(null, error.message, true));
  } 
}

export default {
  newOrder,
  getOrdersByEmail
};
