import { createRoot } from "react-dom/client";
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useControls } from "leva";

const towerQuantity = 45;
const maxTowerHeight = 80;
const minTowerHeight = 10;
let towersArray = [];

const towerSize = 7;
const distanceBetweenTowers = towerSize + 2;

const towersAreaX = 40;
const towersAreaNegX = -40;
const towersAreaY = 40;
const towersAreaNegY = -40;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isTowerOverlapping(towerArray, towerPosition, minDistance) {
  let isOverlapping = false;
  towerArray.forEach((tower) => {
    let a = tower.x - towerPosition.x;
    let b = tower.y - towerPosition.y;
    let distance = Math.hypot(a, b);

    if (distance < minDistance) {
      isOverlapping = true;
    }
  });
  return isOverlapping;
}

function generateTowersArray() {
  let meshObject;
  let contador = 1;
  let skipped = 0;

  for (let contador = 0; contador < towerQuantity; contador++) {
    if (towersArray.length == 0) {
      meshObject = {
        x: randomIntFromInterval(towersAreaNegX, towersAreaX),
        y: randomIntFromInterval(towersAreaNegY, towersAreaY),
        z: 0,
      };
      towersArray.push(meshObject);
      contador += 1;
    } else {
      meshObject = {
        x: randomIntFromInterval(towersAreaNegX, towersAreaX),
        y: randomIntFromInterval(towersAreaNegY, towersAreaY),
        z: 0,
      };

      if (!isTowerOverlapping(towersArray, meshObject, distanceBetweenTowers)) {
        towersArray.push(meshObject);
      } else {
      }
    }
  }
}

function removeTowerFromMiddle() {
  towersArray.forEach((tower) => {
    if (tower.x < 6 && tower.x > -6) {
      if (tower.y < 6 && tower.y > -6) {
        towersArray = towersArray.filter((towerToRemove) => {
          towerToRemove.x == tower.x && towerToRemove.y == tower.y;
        });
      }
    }
  });
}

const Towers = (props) => {
  generateTowersArray();
  removeTowerFromMiddle();

  return (
    <>
      <ambientLight intensity={0.3} />

      <directionalLight color={"#5f5b9a"} position={[7, 8, 7]} intensity={13} />

      <directionalLight
        position={[-5, -5, 50]}
        intensity={18}
        color={0x000000}
      />
      <directionalLight
        position={[-5, -5, 120]}
        intensity={9}
        color={0x363636}
      />
      {towersArray.map((item) => {
        return (
          <mesh
            key={item.x + item.y * Math.random()}
            position={[item.x, item.y, 0]}
          >
            <boxGeometry
              args={[
                towerSize,
                towerSize,
                randomIntFromInterval(minTowerHeight, maxTowerHeight),
              ]}
            />
            <meshStandardMaterial color={0xdee0dc} />
          </mesh>
        );
      })}
    </>
  );
};

export default Towers;
