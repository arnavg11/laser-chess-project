const def_brd = [
  [1, 2, 0, 0, 0, 0, 0, 0, 1, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 2, 0, 0, 0, 0, 0, 0, 1, 2],
];
const ace =
  "4DrdKr Drddr02/2dr17/3dw26/dr31dw11srasrb1dr01dw2/dr01dw21swbswa1dr31dw1/6dr03/7dw32/2dw2DwuKw Dwu4";

const curiosity =
  "4DrdKr Drdsrb2/91/3dw22dr33/dr3dw12dw0srb2dr0dw2/dr0dw22swbdr22dr3dw1/3dw12dr03/91/2swbDwuKw Dwu4";

const grail =
  "4dr1Drddr03/5Kr 4/dr33dr1Drdsrb3/dr01sra1dw21dw03/3dr21dr01swa1dw2/3swbDwudw33dw1/4Kw 5/3dw2Dwudw34";

const mercury =
  "h4dr1Kr dr02swb/5Drddr03/dr02srb1Drd4/dr33dw23dw11/1dr33dr03dw1/4Dwu1swb2dw2/3dw2Dwu5/srb2dw2Kw dw34h";

const sophie =
  "4Kr dw2dr03/3Drd1Drr3dw1/dr33dr1dr01swb1dw2/7sra2/2swa7/dr01srb1dw2dw33dw1/dr33Dwl1Dwu3/3dw2dr0Kw 4";

function read(config) {
  var ret = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ];
  let ind = 0;
  if (config[0] == "h") {
    ret[0][0] = 1;
    ind++;
  } else {
    ret[0][0] = 0;
  }
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 10; x++) {
      if (/\d/.test(config[ind])) {
        let spaces = int(config[ind]);
        ind++;
        x += spaces - 1;
      } else {
        ret[y][x] = config[ind] + config[ind + 1] + config[ind + 2];
        ind += 3;
      }
    }

    ind++;
  }
  ret[7][9] = (config[config.length - 1] == "h") * 1;
  return ret;
}

// 0 - no helic; 1 - red helic; 2 - white helic
// For emitter: 0 - vertical axis, 1 - horizontal axis
