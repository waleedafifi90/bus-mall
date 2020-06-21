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

function Product(name, url) {
    this.name = name;
    this.url = url;
    this.numberOfClicks = 0;
    this.timeShown = 0;
    allProduct.push(this);
}


new Product('Bag', 'assets/img/bag.jpg');
new Product('Banana', 'assets/img/banana.jpg');
new Product('Bathroom', 'assets/img/bathroom.jpg');
new Product('boots', 'assets/img/boots.jpg');
new Product('breakfast', 'assets/img/breakfast.jpg');
new Product('bubblegum', 'assets/img/bubblegum.jpg');
new Product('chair', 'assets/img/chair.jpg');

console.log(allProduct);

function pickImages() {
    var leftIndex = generateRandomNumber();
    var centerIndex = generateRandomNumber();
    var rightIndex = generateRandomNumber();

    while(leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex) {
        centerIndex = generateRandomNumber();
        rightIndex = generateRandomNumber();
        leftIndex = generateRandomNumber();
    }

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

function generateRandomNumber() {
    return Math.floor(Math.random() * allProduct.length);
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
        for(var i = 0; i < allProduct.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = allProduct[i].name + 'has ' + allProduct[i].numberOfClicks + ' clicks, and ' + allProduct[i].timeShown + ' time shown';
            finalResult.appendChild(listItem);
        }
    }


    console.log(currentRightImage);
    console.log(currentLeftImage);
    console.log(currentcenterImage);
}