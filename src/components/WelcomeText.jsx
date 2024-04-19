import { React, useEffect, useState } from "react";
import "../App.css";

function WelcomeText() {
  const [fadeIn, setFadeIn] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isMounted) {
      setTimeout(() => {
        setFadeIn(true);
      }, 1000 /* 9000 */);

      setTimeout(() => {
        setFadeIn(false);
        setIsMounted(false);
      }, 4000 /* 9000 */);
    }
  });

  return (
    <h1
      className={`flex font-outline-2 text-3xl tracking-[.11em] text-white w-screen h-screen absolute z-10 justify-center items-center font-extrabold font-sans transition-all duration-[1000ms] ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      Welcome to ̶̧͙̣̞̻̹͎̭͙̏̔̎̿̎͆͊͂͆͒̽̅̽̕͠ ̸̗̹͗̔̏͐̀̔͠ͅ ̶̢̜̙̝̲̺̹̮̭͚̮̐̅́̽̀̉̽́̽ ̶̢̨̻͙̯̣͙͈͓̤̟͕̻̩͈̂̀͋̎̄̋̔͑͆̾̈̊̾͝͠ͅ ̶̺̜̰̥̗͌̊̈̑̊̈́͌̆̈͂͝͝ ̴̺͂̋ ̵̨̛̣̖͎̦̜͕̰̮̬͖͈̯̱̅̊̌̊͋͗̀̍̄̃̇͑̎̌̚͝ͅ ̷͙̦͙͎̋̆̀̽͒̈́͛̾͗̕̕͘̕ ̴͚̳͍̙̜̝̯̣̭̠̱͕̽ ̶̛̜͎̲̺͚̱̞̉̒̽̓̋̅̿̂̊̕͝͠ ̷͎̗̥͇̺͚̜̩͗̾̉̇͑̌̀̋̍̽́͂͛̕̕͝ ̷̛̥̝̪̫͙̺̭̮̞̊̋̎̉̊̈́̚͝͠͝ ̶̡̧̛͉͇̳̜͚̗͙̭̭̰̟̩̉́̀̒̒̾̈́̓̇͘ ̷͎̩̼̭̘̆̀̅̊̄̔̓͋̊͛̈̿̓̍̒̉͐͜ ̴̡̨̘̪͙̣̠̺̳̺̩͚̩͊̓̅̊̎͆͋̐͐͜͠ͅͅ ̸̡̛͚͉͖̤̩̝̺̭̗̖͛̆̇͑̈́̒̅̐͑͐̿̕͝ ̸̤̼͎͕̥͂̃͑͊̇ ̵̰͖̤͖͇̞͙͌̓̏͗͆͆̃̿̅͌̀̔͘͝͝͝͠ ̷̡͚̖̬̪̲͗̇̋̒̈́̚ ̷̙̩͆͊͊̽̇̏ ̷̗̱̻̣̩̻̟͌͗̀͛́͒͋ ̴̩͍̬̬̼̏̽͒̆̏͌̃͛̾̒̓ ̴̼̪̀̐́̋̋̐͌͋̉̍͘̚ ̵̘̲͙̔͂͊̂͆̂̈́́̒͆͒͊͘ ̸̢̧̧̳̥̖̪̗͚͉͓̹̺̋̈́̅ ̴̥͎̭̠͙̟̻͈̜̫͕̠̙̮̈̀̈́̏̃ ̴͓͓̬̝̝̜̲̘̮̤̼̭̼͚̌͒̍̿̍̋͛̿͊͝ͅ ̷̼̘̠͖̣̥͉̄̓́͛̍̓̇͆͂̍̓͌͛̕̚ ̸̨͖̤͇̼̯͔̖͓̣̩̖͐̿͂̿
    </h1>
  );
}

export default WelcomeText;
