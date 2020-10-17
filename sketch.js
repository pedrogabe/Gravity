function setup() {
  createCanvas(document.body.clientWidth, 400);
}
var gravityCoefficient = 0.5;
var objects = []
var toBeCreated;
var objectOnCreation = false;
var newX, newY, newRadius=20, newColor="rgb(255,255,255)", newMass=20;

function draw() {

  background(220);
  stroke(0);
  if (objectOnCreation) {
    fill(newColor)
    ellipse(newX, newY, newRadius);
    if (mouseIsPressed) {
      line(newX, newY, mouseX, mouseY)
    }
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
        let angleFirstToSecond = atan((object.y - secondObject.y) / (object.x - secondObject.x))
        let distance = sqrt(pow(object.x - secondObject.x, 2) + pow(object.y - secondObject.y, 2))
        if (distance < 20) {
          object.stroke = 'red'
          secondObject.stroke = 'red'
        } //Detector de colisiones
        if (object.x > secondObject.x) {
          angleFirstToSecond += PI;
        }
        let xAttraction = cos(angleFirstToSecond) * gravity(object.mass, secondObject.mass, distance);
        let yAttraction = sin(angleFirstToSecond) * gravity(object.mass, secondObject.mass, distance);
        object.deltaX += xAttraction;
        object.deltaY += yAttraction;
      }

      object.p.innerHTML = i + '~~';
      object.p.innerHTML += 'X:' + Math.round(object.x*100)/100  + '  Y:' + Math.round(object.y*100)/100;
    }
  }
  for (i in objects) {
    let object = objects[i]
    object.x += object.deltaX;
    object.y += object.deltaY;
    if (object.stroke != undefined) {
      stroke(object.stroke)
    } else {
      stroke('black');
    }
    fill(object.color);
    ellipse(object.x, object.y, object.radius);
  }

}

window.addEventListener('mousedown', function(e) {
  if(e.target==document.querySelector('canvas')){
    objectOnCreation = true;
    newX = mouseX;
    newY = mouseY;
  }
})
window.addEventListener('mouseup', function() {
  if(objectOnCreation){
    objectOnCreation = false;
    objects.push({
      radius: newRadius,
      mass: newMass,
      color:newColor,
      x: newX,
      y: newY,
      deltaX: (mouseX - newX) / 100,
      deltaY: (mouseY - newY) / 100,
      p: document.createElement('p')
    })
    let p = objects[objects.length - 1].p;
    p.innerHTML += objects.length + '~~';
    document.body.appendChild(p);
  }
})

function gravity(m1, m2, distance) {
  return ((m1 * m2) / pow(distance, 2)) * gravityCoefficient
}