'use-strict';

var productSection = document.getElementById('all_product');
var leftImage = document.getElementById('left_img');
var centerImage = document.getElementById('center_img');
var rightImage = document.getElementById('right_img');
var finalResult = document.getElementById('finalResult');

var allProduct = [];
var totalClicks = 0;


var currentLeftImage;
var currentRightImage;
var currentcenterImage;

var previousLeftImageIndex;
var previousMiddelImageIndex;
var previousrightImageIndex;

var productName = [];

function Product(name, url) {
    this.name = name;
    this.url = url;
    this.numberOfClicks = 0;
    this.timeShown = 0;
    allProduct.push(this);
    productName.push(this.name);
}


new Product('Bag', 'assets/img/bag.jpg');
new Product('Banana', 'assets/img/banana.jpg');
new Product('Bathroom', 'assets/img/bathroom.jpg');
new Product('Boots', 'assets/img/boots.jpg');
new Product('Breakfast', 'assets/img/breakfast.jpg');
new Product('Bubblegum', 'assets/img/bubblegum.jpg');
new Product('Chair', 'assets/img/chair.jpg');
new Product('Cthulhu', 'assets/img/cthulhu.jpg');
new Product('Dog duck', 'assets/img/dog-duck.jpg');
new Product('Dragon', 'assets/img/dragon.jpg');
new Product('Pen', 'assets/img/pen.jpg');
new Product('Pet sweep', 'assets/img/pet-sweep.jpg');
new Product('Scissors', 'assets/img/scissors.jpg');
new Product('Sweep', 'assets/img/sweep.png');
new Product('Tauntaun', 'assets/img/tauntaun.jpg');
new Product('Shark', 'assets/img/shark.jpg');
new Product('Unicorn', 'assets/img/unicorn.jpg');
new Product('Usb', 'assets/img/usb.gif');
new Product('Water can', 'assets/img/water-can.jpg');
new Product('Wine glass', 'assets/img/wine-glass.jpg');

console.log(allProduct);

function pickImages() {

    var imageBox = [];

    if (totalClicks > 0) {
        imageBox = [previousLeftImageIndex, previousMiddelImageIndex, previousrightImageIndex];
    }


    var leftIndex = generateRandomNumber(imageBox);
    imageBox.push(leftIndex);
    var centerIndex = generateRandomNumber(imageBox);
    imageBox.push(centerIndex);
    var rightIndex = generateRandomNumber(imageBox);


    previousLeftImageIndex = leftIndex;
    previousMiddelImageIndex = centerIndex;
    previousrightImageIndex = rightIndex;

    // while(leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex) {
    //     centerIndex = generateRandomNumber();
    //     rightIndex = generateRandomNumber();
    //     leftIndex = generateRandomNumber();
    // }

    leftImage.setAttribute('src', allProduct[leftIndex].url);
    centerImage.setAttribute('src', allProduct[centerIndex].url);
    rightImage.setAttribute('src', allProduct[rightIndex].url);

    currentLeftImage = allProduct[leftIndex];
    currentRightImage = allProduct[rightIndex];
    currentcenterImage = allProduct[centerIndex];

    allProduct[leftIndex].timeShown += 1;
    allProduct[centerIndex].timeShown += 1;
    allProduct[rightIndex].timeShown += 1;
}

function generateRandomNumber(imageBox) {
    var random;
    var allowed;
    do {

        random = Math.floor(Math.random() * allProduct.length);
        allowed = true;

        for (var i = 0; i < imageBox.length; i++) {


            if (imageBox[i] === random) {
                allowed = false;

            }

        }
    } while (!allowed);


    return random;

    // return Math.floor(Math.random() * allProduct.length);
}

pickImages();

productSection.addEventListener('click', handleClick);

function handleClick(event) {
    if (totalClicks < 25) {

        var clickedElement = event.target;
        var clickedElementId = clickedElement.id;

        if (clickedElementId === 'left_img' || clickedElementId === 'center_img' || clickedElementId === 'right_img') {
            totalClicks++;

            if (clickedElementId === 'left_img') {
                currentLeftImage.numberOfClicks += 1;
            }

            if (clickedElementId === 'center_img') {
                currentRightImage.numberOfClicks += 1;
            }

            if (clickedElementId === 'right_img') {
                currentRightImage.numberOfClicks += 1;
            }
            pickImages();
        }
    } else {
        // for (var i = 0; i < allProduct.length; i++) {
        //     var listItem = document.createElement('li');
        //     listItem.textContent = allProduct[i].name + ' has ' + allProduct[i].numberOfClicks + ' clicks, and ' + allProduct[i].timeShown + ' time shown';
        //     finalResult.appendChild(listItem);
        // }
        drawChart();
        productSection.removeEventListener('click', handleClick);
    }


    console.log(currentRightImage);
    console.log(currentLeftImage);
    console.log(currentcenterImage);
}

function drawChart() {

    var allClicks = [];
    var allShown = [];

    for (var i = 0; i < allProduct.length; i++) {
        allClicks.push(allProduct[i].numberOfClicks);
    }

    for (var x = 0; x < allProduct.length; x++) {
        allShown.push(allProduct[x].timeShown);
    }

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productName,
            datasets: [{
                    label: '# of Clicks',
                    data: allClicks,
                    backgroundColor: '#a0c1b8',
                    borderColor: '#f4ebc1',
                    borderWidth: 1
                },
                {
                    label: '# of Shows',
                    data: allShown,
                    backgroundColor: '#709fb0',
                    borderColor: '#f4ebc1',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        precision: 0
                    }
                }]
            }
        }
    });


}