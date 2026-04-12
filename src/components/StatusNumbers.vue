<template>
  <section id="🧱StatusNumbers">
    <div id="🧱StatusNumbers__X">
      <span id="🧱StatusNumbers__X__Lv">
        {{ pageGameStore.data.basic.lv }}
      </span>
      <span id="🧱StatusNumbers__X__Exp">
        {{ pageGameStore.data.basic.exp }}
      </span>
    </div>
    <div id="🧱StatusNumbers__X2">
      <span id="🧱StatusNumbers__X2__Hp">
        {{ pageGameStore.data.basic.hp }}/{{ pageGameStore.data.basic.hp }}
      </span>
      <span id="🧱StatusNumbers__X2__Mp">
        {{ pageGameStore.data.basic.mp }}/{{ pageGameStore.data.basic.mp }}
      </span>
      <span id="🧱StatusNumbers__X2__Ac">{{ pageGameStore.out.getAC() }}</span>
    </div>
    <ul id="🧱StatusNumbers__X3">
      <li id="🧱StatusNumbers__X3__Str">
        {{ pageGameStore.data.basic.str }}
      </li>
      <li id="🧱StatusNumbers__X3__Dex">
        {{ pageGameStore.data.basic.dex }}
      </li>
      <li id="🧱StatusNumbers__X3__Con">
        {{ pageGameStore.data.basic.con }}
      </li>
      <li id="🧱StatusNumbers__X3__Int">
        {{ pageGameStore.data.basic.int }}
      </li>
      <li id="🧱StatusNumbers__X3__Wis">
        {{ pageGameStore.data.basic.wis }}
      </li>
      <li id="🧱StatusNumbers__X3__Cha">
        {{ pageGameStore.data.basic.cha }}
      </li>
    </ul>
    <span id="🧱StatusNumbers__Er">{{ pageGameStore.data.basic.er }}</span>
  </section>
</template>

<script setup>
import { usePageGameStore } from "../stores/pages/pageGame";

const pageGameStore = usePageGameStore();
</script>

<style lang="scss">
#🧱StatusNumbers {
  position: absolute;
  transform: scale(0.47);
  inset: -56%;

  @media (min-height: 321px) {
    & {
      transform: scale(0.6);
      inset: -34%;
    }
  }

  @media (min-height: 480px) {
    & {
      transform: unset;
      inset: 0%;
      font-size: 2.6vmin;
    }
  }

  #🧱StatusNumbers__X {
    position: absolute;
    inset: 4% 15% 91.5% 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;
  }

  #🧱StatusNumbers__X2 {
    position: absolute;
    inset: 12.2% 46% 73% 30%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-height: 480px) {
      & {
        top: 12.7%;
      }
    }

    #🧱StatusNumbers__X2__Hp,
    #🧱StatusNumbers__X2__Mp,
    #🧱StatusNumbers__X2__Ac {
      flex: 1;
      line-height: 100%;
      display: flex;
      align-items: center;
    }
  }

  #🧱StatusNumbers__X3 {
    position: absolute;
    inset: 41.5% 68% 30% 13%;
    display: flex;
    flex-direction: column;
    align-items: center;

    #🧱StatusNumbers__X3__Str,
    #🧱StatusNumbers__X3__Dex,
    #🧱StatusNumbers__X3__Con,
    #🧱StatusNumbers__X3__Int,
    #🧱StatusNumbers__X3__Wis,
    #🧱StatusNumbers__X3__Cha {
      flex: 1;
      line-height: 100%;
      display: flex;
      align-items: center;
    }
  }

  #🧱StatusNumbers__Er {
    position: absolute;
    inset: 89.8% 25% 5.5% 63%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
