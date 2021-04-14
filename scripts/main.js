//why bother
let scripts = [
  "missiles", "bombs", "baseplate", "decoys", "unitloader"
];

scripts.forEach(e => {
  try{
    require(e)
  }catch(c){
    Log.err(c)
  }
});
