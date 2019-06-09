function tag(strings, ...values) {
  console.log({ strings, values });
  return true;
}

const firstName = "Julie";
const lastName = "Norcross";
const catName = "Jezebel";

tag`hello my name is ${firstName} ${lastName} and my cat's name is ${catName}. That is all.`;
