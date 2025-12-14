<template>
  <section id="🧱StatusNumbers">
    <div id="🧱StatusNumbers__X">
      <span id="🧱StatusNumbers__X__Lv">
        {{ roleStore.out.currentData().basic.lv }}
      </span>
      <span id="🧱StatusNumbers__X__Exp">
        {{ roleStore.out.currentData().basic.exp }}
      </span>
    </div>
    <div id="🧱StatusNumbers__X2">
      <span id="🧱StatusNumbers__X2__Hp">
        {{ roleStore.out.currentData().basic.hp }}/{{
          roleStore.out.currentData().basic.hp
        }}
      </span>
      <span id="🧱StatusNumbers__X2__Mp">
        {{ roleStore.out.currentData().basic.mp }}/{{
          roleStore.out.currentData().basic.mp
        }}
      </span>
      <li id="🧱StatusNumbers__X2__Ac">{{ roleStore.out.getAC() }}</li>
    </div>
    <ul id="🧱StatusNumbers__X3">
      <li id="🧱StatusNumbers__X3__Str">
        {{ roleStore.out.currentData().basic.str }}
      </li>
      <li id="🧱StatusNumbers__X3__Dex">
        {{ roleStore.out.currentData().basic.dex }}
      </li>
      <li id="🧱StatusNumbers__X3__Con">
        {{ roleStore.out.currentData().basic.con }}
      </li>
      <li id="🧱StatusNumbers__X3__Int">
        {{ roleStore.out.currentData().basic.int }}
      </li>
      <li id="🧱StatusNumbers__X3__Wis">
        {{ roleStore.out.currentData().basic.wis }}
      </li>
      <li id="🧱StatusNumbers__X3__Cha">
        {{ roleStore.out.currentData().basic.cha }}
      </li>
    </ul>
    <li id="🧱StatusNumbers__Er">2</li>
  </section>
</template>

<script setup>
import { useRoleStore } from "../stores/role";

const roleStore = useRoleStore();
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
