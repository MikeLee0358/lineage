const dummyData = {
  lv: 1,
  exp: "0.00%",
  hp: 86,
  mp: 1,
  ac: 10,
  mr: 0,
  er: 2,
  str: 22,
  dex: 12,
  con: 14,
  int: 9,
  wis: 8,
  cha: 12,
};

export async function getApiRoleBasic() {
  // pretend api data back
  const data = new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData);
    }, 3000);
  });

  return data;
}
