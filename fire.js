(() => {
  const fireColorsPalette = [
    "rgb(7,7,7)",
    "rgb(31,7,7)",
    "rgb(47,15,7)",
    "rgb(71,15,7)",
    "rgb(87,23,7)",
    "rgb(103,31,7)",
    "rgb(119,31,7)",
    "rgb(143,39,7)",
    "rgb(159,47,7)",
    "rgb(175,63,7)",
    "rgb(191,71,7)",
    "rgb(199,71,7)",
    "rgb(223,79,7)",
    "rgb(223,87,7)",
    "rgb(223,87,7)",
    "rgb(215,95,7)",
    "rgb(215,95,7)",
    "rgb(215,103,15)",
    "rgb(207,111,15)",
    "rgb(207,119,15)",
    "rgb(207,127,15)",
    "rgb(207,135,23)",
    "rgb(199,135,23)",
    "rgb(199,143,23)",
    "rgb(199,151,31)",
    "rgb(191,159,31)",
    "rgb(191,159,31)",
    "rgb(191,167,39)",
    "rgb(191,167,39)",
    "rgb(191,175,47)",
    "rgb(183,175,47)",
    "rgb(183,183,47)",
    "rgb(183,183,55)",
    "rgb(207,207,111)",
    "rgb(223,223,159)",
    "rgb(239,239,199)",
    "rgb(255,255,255)"
  ];

  const pixelSize = 20;

  const prepareCanvas = canvasQuery => {
    const canvas = document.querySelector(canvasQuery);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return canvas;
  };

  const createFireDataStructure = ({ x, y }) =>
    Array.from({ length: x * y }, () => 0);

  const getFireResolution = canvas => ({
    x: Math.ceil(canvas.width / pixelSize),
    y: Math.ceil(canvas.height / pixelSize)
  });

  const setFireSource = (fire, size, level = 36) => {
    for (let x = fire.length - size.x; x < fire.length; x++) {
      fire[x] = level;
    }
  };

  const calculateFirePropagation = (fire, size) => {
    for (let y = 0; y < size.y - 1; y++) {
      for (let x = 0; x < size.x; x++) {
        const decay = Math.floor(Math.random() * 3);
        const pixelIndex = y * size.x + x;

        fire[pixelIndex - decay] = fire[pixelIndex + size.x] - decay;
      }
    }
  };

  const renderFire = (fire, size, ctx) => {
    for (let y = 0; y < size.y; y++) {
      for (let x = 0; x < size.x; x++) {
        const pixel = fire[y * size.x + x];

        ctx.fillStyle = fireColorsPalette[pixel] || fireColorsPalette[0];
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  };

  const setFire = () => {
    const canvas = prepareCanvas(".doomFireCanvas");
    const context = canvas.getContext("2d");

    const size = getFireResolution(canvas);
    let fire = createFireDataStructure(size);

    setFireSource(fire, size);

    setInterval(() => {
      calculateFirePropagation(fire, size);
      renderFire(fire, size, context);
    }, 50);
  };

  setFire();
})();
