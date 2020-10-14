function setup() {
  createCanvas(400, 400);
}
var gravityCoefficient = 0.5;
var objects = []
var toBeCreated;
var objectOnCreation = false;
var newX, newY;

function draw() {

  background(220);
  fill(255)

  if (objectOnCreation) {
    ellipse(newX, newY, 20);
  }
  if (mouseIsPressed) {
    line(newX, newY, mouseX, mouseY)
  }

  for (i in objects) {
    let object = objects[i];
    /*if (object.x > 400 || object.x < 0 || object.y > 400 || object.y < 0) {
      object.p.remove();
      objects.splice(i, 1);
      continue
    }*/ //Destruir objetos al salir del canvas
    for (secondIndex in objects) {
      let secondObject = objects[secondIndex]
      if (secondObject != object) {
        let distance = sqrt(pow(object.x - secondObject.x, 2) + pow(object.y - secondObject.y, 2))
        if (distance < 20) {
          object.color = 'red'
          secondObject.color = 'red'
        } //Detector de colisiones
        let angleFirstToSecond = atan((object.y - secondObject.y) / (object.x - secondObject.x))
        if (object.x > secondObject.x) {
          angleFirstToSecond += PI;
        }
        let xAttraction = cos(angleFirstToSecond) * gravity(20, 20, distance);
        let yAttraction = sin(angleFirstToSecond) * gravity(20, 20, distance);
        object.deltaX += xAttraction;
        object.deltaY += yAttraction;
      }

      object.p.innerHTML = i + '~~';
      object.p.innerHTML += 'X:' + object.x + '  Y:' + object.y;
    }
  }
  for (i in objects) {
    let object = objects[i]
    object.x += object.deltaX;
    object.y += object.deltaY;
    if (object.color != undefined) {
      fill(object.color)
    } else {
      fill(255)
    }
    ellipse(object.x, object.y, 20);
  }

}

window.addEventListener('mousedown', function() {
  objectOnCreation = true;
  newX = mouseX;
  newY = mouseY;
})
window.addEventListener('mouseup', function() {
  objectOnCreation = false;
  objects.push({
    x: newX,
    y: newY,
    deltaX: (mouseX - newX) / 100,
    deltaY: (mouseY - newY) / 100,
    p: document.createElement('p')
  })
  let p = objects[objects.length - 1].p;
  p.innerHTML += objects.length + '~~'
  document.body.appendChild(p);
})

function gravity(m1, m2, distance) {
  return ((m1 * m2) / pow(distance, 2)) * gravityCoefficient
}