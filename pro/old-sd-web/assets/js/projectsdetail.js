jQuery(document).ready(function () {
  //lightgallery
  $(".big-img-1").on("click", function (e) {
    $(this).lightGallery({
      dynamic: true,
      dynamicEl: [
        {
          src: "projects/greenstyle-sourcing-office/1.jpg",
          subHtml:"<h4>Greenstyle Sourcing Office</h4><p>Slide left or right to view the gallery</p>",
          thumb: "projects/greenstyle-sourcing-office/1.jpg",
        },
        {
          src: "projects/greenstyle-sourcing-office/2.jpg",
          subHtml: "<h4>Greenstyle Sourcing Office</h4>",
          thumb: "projects/greenstyle-sourcing-office/2.jpg",
        },
        {
          src: "projects/greenstyle-sourcing-office/3.jpg",
          subHtml: "<h4>Greenstyle Sourcing Office</h4>",
          thumb: "projects/greenstyle-sourcing-office/3.jpg",
        },
        {
          src: "projects/greenstyle-sourcing-office/4.jpg",
          subHtml: "<h4>Greenstyle Sourcing Office</h4>",
          thumb: "projects/greenstyle-sourcing-office/4.jpg",
        },
        {
          src: "projects/greenstyle-sourcing-office/5.jpg",
          subHtml: "<h4>Greenstyle Sourcing Office</h4>",
          thumb: "projects/greenstyle-sourcing-office/5.jpg",
        },
        {
          src: "projects/greenstyle-sourcing-office/6.jpg",
          subHtml: "<h4>Greenstyle Sourcing Office</h4>",
          thumb: "projects/greenstyle-sourcing-office/6.jpg",
        },
        {
          src: "projects/greenstyle-sourcing-office/7.jpg",
          subHtml: "<h4>Greenstyle Sourcing Office</h4>",
          thumb: "projects/greenstyle-sourcing-office/7.jpg",
        },
        {
          src: "projects/greenstyle-sourcing-office/8.jpg",
          subHtml: "<h4>Greenstyle Sourcing Office</h4>",
          thumb: "projects/greenstyle-sourcing-office/8.jpg",
        },
      ],
    });
  });
});
