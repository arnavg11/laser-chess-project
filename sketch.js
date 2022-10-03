var board, turnRed,
  tempOrient,
  l, peice, tempLoc, time = [[],[]];
const scl = 60

function setup(c) {
  createCanvas(scl * 10, scl * 8);
  let conf;
  if(c){
    conf=c;
  }
  else {
    conf=grail
  }
  board = null
  turnRed = true;
  tempOrient=null;
  l = null;
  peice=null;
  tempLoc = null
  board = read(conf)
  //double check
  stroke(0)
  noFill()
  strokeWeight(3)
}

function draw() {
  background(100);
  if (keyIsDown(32) && l) {
    showLaser()
  }
  if (peice) {
    push()
    fill(0, 255, 0, 100)
    square(peice[0] * scl, peice[1] * scl, scl)
    pop()
  }
  board.forEach((row, y) => {
    row.forEach((e, x) => {
      if ((x == 0 && y == 0) || (x == 9 && y == 7)) {
        let o;
        if (peice && tempOrient != null) o = x == peice[0] && y == peice[1] ? tempOrient : e
        else o = e
        push()
        translate(x * scl + scl / 2, y * scl + scl / 2)
        switch (o) {
          case 0:
            rotate(PI / 2 - PI * (x == 9))
            break;
          case 1:
            rotate(PI * (x == 9))
            break;
        }
        //draw emitter
        noStroke()
        fill(255, 0, 0)
        ellipse((scl - scl / 3) / 2, 0, 5, 10)
        fill(0, 0, 139)
        circle(0, 0, scl - scl / 3)
        fill(255, 255 * (x == 9), 255 * (x == 9))
        circle(0, 0, scl / 4)
        pop()
      } else if (e != "") {
        push()
        let t;
        if (tempOrient != null) t = (x == peice[0] && y == peice[1]) * 1
        else if (tempLoc) {
          if (tempLoc.length == 2) t = (x == peice[0] && y == peice[1]) * 1
          else {
            t = ((x == tempLoc[0] && y == tempLoc[1]) || (x == peice[0] && y == peice[1])) * 1
          }
        } else t = 0
        t = map(t, 0, 1, 255, 150)
        translate(x * scl + scl / 2, y * scl + scl / 2)
        if (e[1] == 'r') fill(255, 0, 0, t)
        else fill(255, t)
        noStroke()
        switch (e[0]) {
          case 'd':
            // deflector
            rotate(e[2] * PI / 2)
            triangle(scl / 2, -scl / 2, -scl / 2, -scl / 2, -scl / 2, scl / 2)
            stroke('#aaa9ad');
            strokeWeight(4);
            line(scl / 2, -scl / 2, -scl / 2, scl / 2)
            break;
          case 'D':
            // defender
            rectMode(CENTER)
            square(0, 0, 3 * scl / 6)
            switch (e[2]) {
              case 'r':
                rotate(PI / 2);
                break;
              case 'd':
                rotate(PI);
                break;
              case 'l':
                rotate(3 * PI / 2);
                break;
            }
            //default case is 'u' which requires no turning
            triangle(0, 0, -scl / 2, -5 * scl / 14, scl / 2, -5 * scl / 14) // -1/2+1/7 = -5/14
            rectMode(CORNER)
            fill(51)
            rect(-scl / 2, -scl / 2, scl, scl / 7)
            break;
          case 's':
            rotate(-PI / 4 + (e[2] == 'b') * PI / 2)
            stroke(170, 169, 173);
            strokeWeight(4);
            ellipse(0, 0, scl / 5, scl * Math.sqrt(2))
            break;
          case 'K':
            stroke(0, 0, 100);
            fill(0, 0, 255, 30);
            strokeWeight(3)
            square(-scl / 2, -scl / 2, scl, 10)
            rectMode(CENTER)
            noStroke();
            fill(0, 0, 100)
            square(0, 0, scl / 2)
            if (e[1] == 'w') fill(255, t + 50)
            else fill(255, 0, 0, t + 50)
            circle(0, 0, scl / 2)
            break;
        }
        pop()
      } else {
        push()
        rectMode(CENTER)
        noStroke()
        switch (def_brd[y][x]) {
          case 1:
            fill(255, 0, 0, 100);
            square(x * scl + scl / 2, y * scl + scl / 2, scl / 2);
            break
          case 2:
            fill(255, 100);
            square(x * scl + scl / 2, y * scl + scl / 2, scl / 2);
            break
        }
        pop()
      }
    })
  })
  if (tempLoc) {
    push()
    let x = tempLoc[0],
      y = tempLoc[1],
      e = board[peice[1]][peice[0]]
    translate(x * scl + scl / 2, y * scl + scl / 2)
    if (e[1] == 'r') {
      fill(255, 0, 0)
    } else fill(255)
    noStroke()
    switch (e[0]) {
      case 'd':
        // deflector
        rotate(e[2] * PI / 2)
        triangle(scl / 2, -scl / 2, -scl / 2, -scl / 2, -scl / 2, scl / 2)
        stroke('#aaa9ad');
        strokeWeight(4);
        line(scl / 2, -scl / 2, -scl / 2, scl / 2)
        break;
      case 'D':
        // defender
        rectMode(CENTER)
        square(0, 0, 3 * scl / 6)
        switch (e[2]) {
          case 'r':
            rotate(PI / 2);
            break;
          case 'd':
            rotate(PI);
            break;
          case 'l':
            rotate(3 * PI / 2);
            break;
        }
        //default case is 'u' which requires no turning
        triangle(0, 0, -scl / 2, -5 * scl / 14, scl / 2, -5 * scl / 14) // -1/2+1/7 = -5/14
        rectMode(CORNER)
        fill(51)
        rect(-scl / 2, -scl / 2, scl, scl / 7)
        break;
      case 's':
        rotate(-PI / 4 + (e[2] == 'b') * PI / 2)
        stroke(170, 169, 173);
        strokeWeight(4);
        ellipse(0, 0, scl / 5, scl * Math.sqrt(2))
        break;
      case 'K':
        stroke(0, 0, 100);
        fill(0, 0, 255, 30);
        strokeWeight(3)
        square(-scl / 2, -scl / 2, scl, 10)
        // rectMode(CORNERS)
        // rect()
        rectMode(CENTER)
        noStroke();
        fill(0, 0, 100)
        square(0, 0, scl / 2)
        if (e[1] == 'w') fill(255)
        else fill(255, 0, 0)
        circle(0, 0, scl / 2)
        break;
    }
    pop()
    if (tempLoc[2]) {
      push()
      let x = peice[0],
        y = peice[1],
        e = board[tempLoc[1]][tempLoc[0]]
      translate(x * scl + scl / 2, y * scl + scl / 2)
      if (e[1] == 'r') {
        fill(255, 0, 0)
      } else fill(255)
      noStroke()
      switch (e[0]) {
        case 'd':
          // deflector
          rotate(e[2] * PI / 2)
          triangle(scl / 2, -scl / 2, -scl / 2, -scl / 2, -scl / 2, scl / 2)
          stroke('#aaa9ad');
          strokeWeight(4);
          line(scl / 2, -scl / 2, -scl / 2, scl / 2)
          break;
        case 'D':
          // defender
          rectMode(CENTER)
          square(0, 0, 3 * scl / 6)
          switch (e[2]) {
            case 'r':
              rotate(PI / 2);
              break;
            case 'd':
              rotate(PI);
              break;
            case 'l':
              rotate(3 * PI / 2);
              break;
          }
          //default case is 'u' which requires no turning
          triangle(0, 0, -scl / 2, -5 * scl / 14, scl / 2, -5 * scl / 14) // -1/2+1/7 = -5/14
          rectMode(CORNER)
          fill(51)
          rect(-scl / 2, -scl / 2, scl, scl / 7)
          break;
        case 's':
          rotate(-PI / 4 + (e[2] == 'b') * PI / 2)
          stroke(170, 169, 173);
          strokeWeight(4);
          ellipse(0, 0, scl / 5, scl * Math.sqrt(2))
          break;
        case 'K':
          stroke(0, 0, 100);
          fill(0, 0, 255, 30);
          strokeWeight(3)
          square(-scl / 2, -scl / 2, scl, 10)
          // rectMode(CORNERS)
          // rect()
          rectMode(CENTER)
          noStroke();
          fill(0, 0, 100)
          square(0, 0, scl / 2)
          if (e[1] == 'w') fill(255)
          else fill(255, 0, 0)
          circle(0, 0, scl / 2)
          break;
      }
      pop()
    }
  } else if (tempOrient != null) {
    push()
    let x = peice[0],
      y = peice[1],
      e = board[y][x],
      o = tempOrient
    translate(x * scl + scl / 2, y * scl + scl / 2)
    if (e[1] == 'r') {
      fill(255, 0, 0)
    } else fill(255)
    noStroke()
    switch (e[0]) {
      case 'd':
        // deflector
        rotate(tempOrient * PI / 2)
        triangle(scl / 2, -scl / 2, -scl / 2, -scl / 2, -scl / 2, scl / 2)
        stroke('#aaa9ad');
        strokeWeight(4);
        line(scl / 2, -scl / 2, -scl / 2, scl / 2)
        break;
      case 'D':
        // defender
        rectMode(CENTER)
        square(0, 0, 3 * scl / 6)
        switch (tempOrient) {
          case 'r':
            rotate(PI / 2);
            break;
          case 'd':
            rotate(PI);
            break;
          case 'l':
            rotate(3 * PI / 2);
            break;
        }
        //default case is 'u' which requires no turning
        triangle(0, 0, -scl / 2, -5 * scl / 14, scl / 2, -5 * scl / 14) // -1/2+1/7 = -5/14
        rectMode(CORNER)
        fill(51)
        rect(-scl / 2, -scl / 2, scl, scl / 7)
        break;
      case 's':
        rotate(-PI / 4 + (tempOrient == 'b') * PI / 2)
        stroke(170, 169, 173);
        strokeWeight(4);
        ellipse(0, 0, scl / 5, scl * Math.sqrt(2))
    }
    pop()
  }
  for (let x = 0; x < 11; x++) {
    line(x * scl, 0, x * scl, height)
  }
  for (let y = 0; y < 9; y++) {
    line(0, y * scl, width, y * scl)
  }

  // noLoop()
}

function showLaser() {
  push()
  stroke(255, 0, 0, 200);
  strokeWeight(10)
  let p = l[0][0]
  for (let i = 1; i < l[0].length; i++) {
    let c = p
    let x1 = p[0] * scl + scl / 2,
      y1 = p[1] * scl + scl / 2,
      x2 = l[0][i][0] * scl + scl / 2,
      y2 = l[0][i][1] * scl + scl / 2
    line(x1, y1, x2, y2)
    p = l[0][i]
  }
  pop()
}

function emit() {
  let path = turnRed ? [
      [0, 0]
    ] : [
      [9, 7]
    ],
    x = turnRed ? 0 : 9,
    y = turnRed ? 0 : 7,
    d = turnRed ? board[0][0] : board[7][9] + 2
  for (;;) {
    switch (d) {
      case 0:
        y += 1;
        break;
      case 1:
        x += 1;
        break;
      case 2:
        y -= 1;
        break;
      case 3:
        x -= 1;
        break;
    }
    if (y >= 8 || x >= 10 || y < 0 || x < 0) {
      switch (d) {
        case 0:
          y += 1;
          break;
        case 1:
          x += 1;
          break;
        case 2:
          y -= 1;
          break;
        case 3:
          x -= 1;
          break;
      }
      path.push([x, y])
      return [path, false]
    }
    if (board[y][x] != "" && typeof(board[y][x]) == "string") {
      let e = board[y][x]
      path.push([x, y]);
      switch (e[0]) {
        case 'd':
          let o = e[2]
          switch (d) {
            case 0:
              if (o == 3) d = 1
              else if (o == 2) d = 3
              else return [path, true]
              break;
            case 1:
              if (o == 1) d = 0
              else if (o == 2) d = 2
              else return [path, true]
              break;
            case 2:
              if (o == 0) d = 1
              else if (o == 1) d = 3
              else return [path, true]
              break;
            case 3:
              if (o == 3) d = 2
              else if (o == 0) d = 0
              else return [path, true]
              break;
          }
          break;
        case 's':
          if (e[2] == 'a') {
            switch (d) {
              case 0:
                d = 1;
                break;
              case 1:
                d = 0;
                break;
              case 2:
                d = 3;
                break;
              case 3:
                d = 2;
                break;
            }
          } else {
            switch (d) {
              case 0:
                d = 3;
                break;
              case 1:
                d = 2;
                break;
              case 2:
                d = 1;
                break;
              case 3:
                d = 0;
                break;
            }
          }
          break;
        case 'D':
          switch (e[2]) {
            case 'u':
              if (d == 0) return [path, false]
              else return [path, true]
            case 'r':
              if (d == 3) return [path, false]
              else return [path, true]
            case 'd':
              if (d == 2) return [path, false]
              else return [path, true]
            case 'l':
              if (d == 1) return [path, false]
              else return [path, true]
          };
          break;
        case 'K':
          return [path, true];
      }
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case 32:
      if (tempLoc) {
        if (tempLoc.length == 2) {
          let e = board[peice[1]][peice[0]]
          board[tempLoc[1]][tempLoc[0]] = e
          board[peice[1]][peice[0]] = ""
        } else {
          let e = board[peice[1]][peice[0]];
          board[peice[1]][peice[0]] = board[tempLoc[1]][tempLoc[0]];
          board[tempLoc[1]][tempLoc[0]] = e
        }
        peice = null;
        tempLoc = null
        l = emit()
      } else if (tempOrient != null) {
        if ((peice[0] == 0 && peice[1] == 0) || (peice[0] == 9 && peice[1] == 7)) {
          if (tempOrient != board[peice[1]][peice[0]]) {
            board[peice[1]][peice[0]] = tempOrient;
            tempOrient = null;
            peice = null;
            l = emit()
          }
          return;
        }
        if (!canOrient()) {
          return;
        }
        let e = board[peice[1]][peice[0]]
        board[peice[1]][peice[0]] = e[0] + e[1] + tempOrient;
        tempOrient = null;
        peice = null;
        l = emit()
      }
      break;
    case 38:
      if (peice) {
        let e = board[peice[1]][peice[0]];
        if ((peice[1] == 0 && peice[0] == 0 && turnRed) || (peice[0] == 9 && peice[1]==7 && !turnRed)) {
          if (tempOrient == null) tempOrient = e
          if (tempOrient) tempOrient = 0;
          else tempOrient = 1;
          return;
        }
        if (!turn(e[1])||e[0]=='K') return;
        tempLoc = null;
        if (e == "") return;
        switch (e[0]) {
          case 'd':
            //deflector
            if (tempOrient != null) {
              tempOrient += 1
              if (tempOrient == 4) {
                tempOrient = 0
              }

            } else {
              tempOrient = int(e[2]) + 1
              if (tempOrient == 4) {
                tempOrient = 0
              }
            }
            break;
          case 'D':
            //defender
            let o = tempOrient == null ? e[2] : tempOrient
            switch (o) {
              case 'u':
                tempOrient = 'r'
                break;
              case 'r':
                tempOrient = 'd'
                break;
              case 'd':
                tempOrient = 'l';
                break;
              case 'l':
                tempOrient = 'u';
                break;
            }
            break;
          case 's':
            if (tempOrient == null) tempOrient = e[2]
            if (tempOrient == 'a') tempOrient = 'b'
            else tempOrient = 'a'
            break;
        }
      }
      break;
      case 39:
        if (peice) {
          let e = board[peice[1]][peice[0]];
          if ((peice[1] == 0 && peice[0] == 0 && turnRed) || (peice[0] == 9 && peice[1]==7 && !turnRed)) {
            if (tempOrient == null) tempOrient = e
            if (tempOrient) tempOrient = 0;
            else tempOrient = 1;
            return;
          }
          if (!turn(e[1])||e[0]=='K') return;
          tempLoc = null;
          if (e == "") return;
          switch (e[0]) {
            case 'd':
              //deflector
              if (tempOrient != null) {
                tempOrient += 1
                if (tempOrient == 4) {
                  tempOrient = 0
                }

              } else {
                tempOrient = int(e[2]) + 1
                if (tempOrient == 4) {
                  tempOrient = 0
                }
              }
              break;
            case 'D':
              //defender
              let o = tempOrient == null ? e[2] : tempOrient
              switch (o) {
                case 'u':
                  tempOrient = 'r'
                  break;
                case 'r':
                  tempOrient = 'd'
                  break;
                case 'd':
                  tempOrient = 'l';
                  break;
                case 'l':
                  tempOrient = 'u';
                  break;
              }
              break;
            case 's':
              if (tempOrient == null) tempOrient = e[2]
              if (tempOrient == 'a') tempOrient = 'b'
              else tempOrient = 'a'
              break;
          }
        }
        break;
      case 40:
        if(peice){
          let e = board[peice[1]][peice[0]];
          if((peice[1]==0&&peice[0]==0&&turnRed)||(peice[0]==9&&peice[1]==7&&!turnRed)){
            if(tempOrient==null)tempOrient=e
            if(tempOrient) tempOrient = 0;
            else tempOrient = 1;
            return;
          }
          if(!turn(e[1])||e[0]=='K')return;
          tempLoc = null;
          if(e=="")return;
          switch(e[0]){
            case 'd':
              //deflector
              if(tempOrient!=null) {
                tempOrient = tempOrient-1
                if(tempOrient==-1)tempOrient=3

              }else {
                tempOrient = int(e[2])-1
                if(tempOrient==-1){tempOrient=3}
              }
              break;
            case 'D':
              //defender
              let o = tempOrient==null ? e[2] : tempOrient
              switch (o) {
                case 'u':
                  tempOrient = 'l'
                  break;
                case 'r':
                  tempOrient = 'u'
                  break;
                case 'd':
                  tempOrient = 'r';
                  break;
                case 'l':
                  tempOrient = 'd';
                  break;
              }
              break;
            case 's':
              if(tempOrient==null)tempOrient=e[2]
              if(tempOrient=='a')tempOrient='b'
              else tempOrient = 'a'
              break;
          }
        }
        break;
        case 37:
          if(peice){
            let e = board[peice[1]][peice[0]];
            if((peice[1]==0&&peice[0]==0&&turnRed)||(peice[0]==9||peice[7]&&!turnRed)){
              if(tempOrient==null)tempOrient=e
              if(tempOrient) tempOrient = 0;
              else tempOrient = 1;
              return;
            }
            if(!turn(e[1])||e[0]=='K')return;
            tempLoc = null;
            if(e=="")return;
            switch(e[0]){
              case 'd':
                //deflector
                if(tempOrient!=null) {
                  tempOrient = tempOrient-1
                  if(tempOrient==-1)tempOrient=3

                }else {
                  tempOrient = int(e[2])-1
                  if(tempOrient==-1){tempOrient=3}
                }
                break;
              case 'D':
                //defender
                let o = tempOrient==null ? e[2] : tempOrient
                switch (o) {
                  case 'u':
                    tempOrient = 'l'
                    break;
                  case 'r':
                    tempOrient = 'u'
                    break;
                  case 'd':
                    tempOrient = 'r';
                    break;
                  case 'l':
                    tempOrient = 'd';
                    break;
                }
                break;
              case 's':
                if(tempOrient==null)tempOrient=e[2]
                if(tempOrient=='a')tempOrient='b'
                else tempOrient = 'a'
                break;
            }
          }
          break;
    case 49:
      setup(ace)
      break;
    case 50:
      setup(curiosity)
      break;
    case 51:
      setup(grail)
      break;
    case 52:
      setup(mercury)
      break;
    case 53:
      setup(sophie)
      break;
    case 70:
      console.log("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    case 9:
      console.log(board)
  }
}

function turn(c){
  return (c=='r'&&turnRed)||(c=='w'&&!turnRed)
}

function canOrient() {
  let e = board[peice[1]][peice[0]]
  if (typeof(e) == "number") {
    return e != tempOrient
  }
  switch (e[0]) {
    case 'd':
      //deflector
      return abs(tempOrient - int(e[2])) == 1 || abs(tempOrient - int(e[2])) == 3;
    case 'D':
      //defender
      switch (e[2]) {
        case 'u':
          return tempOrient == 'l' || tempOrient == 'r'
        case 'r':
          return tempOrient == 'u' || tempOrient == 'd'
        case 'd':
          return tempOrient == 'l' || tempOrient == 'r'
        case 'l':
          return tempOrient == 'u' || tempOrient == 'd'
      }
      case 's':
        return e[2] != tempOrient
  }
}

function mousePressed() {
  if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0) return;
  else if (peice == null) {
    tempOrient = null;
    peice = [floor(mouseX / scl), floor(mouseY / scl)]
  } else move()
}


function move() {
  let x = floor(mouseX / scl),
    y = floor(mouseY / scl),
    e = board[peice[1]][peice[0]]
  if (e == "") {
    peice = [x, y];
    return;
  }
  if (board[y][x] != "") {
    let x_ = abs(x - peice[0]),
      y_ = abs(y - peice[1]),
      t = ((e[1] == 'r' ^ def_brd[y][x] == 2) || def_brd[y][x] == 0) && (!(turnRed ^ e[1] == 'r')) && (board[y][x][0] == 'D' || board[y][x][0] == 'd')
    if (e[0] == 's' && typeof(board[y][x]) == "string" && x_ <= 1 && y_ <= 1 && (x_ == 1 || y_ == 1) && t) {
      //swap
      tempLoc = [x, y, true]
      return;
    }
    peice = [x, y];
    tempLoc = null;
    tempOrient = null;
    return;
  }
  let x_ = abs(x - peice[0]),
    y_ = abs(y - peice[1]),
    t = ((e[1] == 'r' ^ def_brd[y][x] == 2) || def_brd[y][x] == 0) && !(e[1] == 'r' ^ turnRed)

  if (x_ <= 1 && y_ <= 1 && (x_ == 1 || y_ == 1) && t) {
    tempOrient = null
    tempLoc = [x, y]
  } else {
    tempOrient = null;
    tempLoc = null;
    peice = [x, y];
  }
}

function keyReleased() {
  switch (keyCode) {
    case 32:
      if (l) {
        turnRed = !turnRed;
        if (l[1]) {
          var p = l[0][l[0].length - 1]
          if(board[p[1]][p[0]][0]=='K')setup(grail)
          else board[p[1]][p[0]] = ""
        }
        l = null
      }
  }
}
