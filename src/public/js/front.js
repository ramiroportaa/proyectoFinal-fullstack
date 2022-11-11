    /* ===============================================================
         LIGHTBOX
      =============================================================== */
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });

    /* ===============================================================
         PRODUCT SLIDER
      =============================================================== */
    $('.product-slider').owlCarousel({
        items: 1,
        thumbs: true,
        thumbImage: false,
        thumbsPrerendered: true,
        thumbContainerClass: 'owl-thumbs',
        thumbItemClass: 'owl-thumb-item'
    });

      /* ===============================================================
           DISABLE UNWORKED ANCHORS
        =============================================================== */
      $('a[href="#"]').on('click', function (e) {
         e.preventDefault();
      });


      //Product Quantity
      function QuantityEvent(nodo) {
        nodo.querySelector('.dec-btn').addEventListener("click", function () {
          let siblings = this.nextElementSibling;
          if (parseInt(siblings.value) >= 1) {
              siblings.value = (parseInt(siblings.value) - 1);
          }
        });
        nodo.querySelector('.inc-btn').addEventListener("click", function () {
          let siblings = this.previousElementSibling;
          siblings.value = (parseInt(siblings.value) +1);
      });
      }
