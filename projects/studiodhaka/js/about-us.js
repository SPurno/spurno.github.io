    const images = [
        'images/team/2.jpg',
        'images/team/1.jpg',
        'images/team/3.jpg',
        'images/team/4.jpg',
        'images/team/5.jpg',
        'images/team/6.jpg',
        'images/team/7.jpg',
        'images/team/8.jpg',
        'images/team/9.jpg',
        'images/team/10.jpg',
        'images/team/11.jpg',
        'images/team/12.jpg',
        'images/team/13.jpg',
        'images/team/14.jpg',
        'images/team/15.jpg',
        'images/team/16.jpg',
        'images/team/17.jpg',
        'images/team/18.jpg',
        'images/team/19.jpg',
        'images/team/20.jpg',
        'images/team/21.jpg',
        'images/team/22.jpg',
        'images/team/23.jpg',
        'images/team/24.jpg',
        'images/team/25.jpg',
        'images/team/26.jpg',
        'images/team/27.jpg',
        'images/team/28.jpg',
        'images/team/29.jpg',
        'images/team/30.jpg',
        'images/team/31.jpg',
        'images/team/32.jpg',
        'images/team/33.jpg',
        'images/team/34.jpg',
        'images/team/35.jpg'
    ];

    const names = [
        'Md. Saiful Islam',
        'Dulal Hossain',
        'Imran Ahmed',
        'Faruk Ahmed',
        'Bipul Hossain'
    ];

    const designations = [
        'Head of 3D Visualization',
        'Senior 3D Artist',
        '3D Artist',
        'Web Developer & Digital Marketeer',
        '3D Artist'
    ];

    let currentIndex = 0;

    $('#imageModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        currentIndex = button.data('index');
        const modal = $(this);
        modal.find('#modalTitle').text(names[currentIndex]);
        modal.find('#modalImage').attr('src', images[currentIndex]);
        modal.find('#modalDesignation').text(designations[currentIndex]);
    });

    $('#prevImage').click(function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        $('#modalTitle').text(names[currentIndex]);
        $('#modalImage').attr('src', images[currentIndex]);
        $('#modalDesignation').text(designations[currentIndex]);
    });

    $('#nextImage').click(function () {
        currentIndex = (currentIndex + 1) % images.length;
        $('#modalTitle').text(names[currentIndex]);
        $('#modalImage').attr('src', images[currentIndex]);
        $('#modalDesignation').text(designations[currentIndex]);
    });