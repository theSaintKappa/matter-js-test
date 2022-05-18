let engine = Matter.Engine.create()

let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1600,
        height: 800,
        wireframes: false
    }
})

let ground = Matter.Bodies.rectangle(1600 / 2, 800 - 35, 1600 - 200, 10, { isStatic: true });
// let boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
// let boxB = Matter.Bodies.rectangle(450, 50, 80, 80);

let mouse = Matter.Mouse.create(render.canvas)
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
})
render.mouse = mouse

let stack = Matter.Composites.stack((1600 - 200) / 2, -500, 5, 10, 0, 0, function(x, y) {
    // return Matter.Bodies.rectangle(x, y, 80, 80)
    let sides = Math.round(Matter.Common.random(2, 8))
    return Matter.Bodies.polygon(x, y, sides, Matter.Common.random(20, 50))
})

Matter.World.add(engine.world, [ground, stack, mouseConstraint]);
Matter.Runner.run(engine);
Matter.Render.run(render);


document.querySelector('.reset').addEventListener('click', function() {
    location.reload()
})