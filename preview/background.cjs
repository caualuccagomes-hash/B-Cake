// Decorative SVG geometry: no images, fonts, network requests or canvas.
module.exports = function backgroundMarkup(hero = false) {
  const particles = Array.from({ length: hero ? 6 : 3 }, (_, i) =>
    `<i class="sugar-particle sugar-${i}" aria-hidden="true"></i>`).join('');
  return `<!-- BECAKE-BG --><div class="bg-effects${hero ? ' bg-effects-hero' : ''}" aria-hidden="true" inert><svg class="syrup syrup-rose" viewBox="0 0 600 340" preserveAspectRatio="none" focusable="false"><g class="syrup-flow"><path d="M-40 15C45 85 95-25 170 45S275 120 320 55 440 15 480 80 580 105 640 35V-30H-40Z"/><path d="M-40 90C40 155 110 25 190 105S290 155 355 100 460 55 505 125 580 150 640 95V-30H-40Z" opacity=".45"/></g></svg><svg class="syrup syrup-sage" viewBox="0 0 600 340" preserveAspectRatio="none" focusable="false"><g class="syrup-flow"><path d="M-40 320C50 235 110 340 180 270S300 220 350 280 470 330 510 250 600 235 640 290V380H-40Z"/></g></svg>${particles}</div><!-- END-BECAKE-BG -->`;
};
