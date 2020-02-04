export default function init() {
  $(document).ready(function () {

    $('.js-submitEmail').click(e => {
      e.preventDefault()
      e.stopImmediatePropagation();
      const email = $('.js-subscriber').val()
      if (email.trim()) {

      } else {
        // return
        return
      }
    })
  });
}
