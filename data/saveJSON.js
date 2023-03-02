import { readFileSync, writeFile } from 'fs'



function store(item){
    let data = readFileSync('./data/data.json')
    let json = JSON.parse(data)

    json.push(item)

    writeFile("./data/data.json", JSON.stringify(json), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        }
      });
}

function emptyAll(){
  writeFile("./data/data.json", "[]", (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });
}

export const save = {
    store,
    emptyAll
}
