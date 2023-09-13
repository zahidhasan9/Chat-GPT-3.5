import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-sdD8Q5Cm747MElmQosYUU7hL",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const port = 5000;

app.post("/", async (req, res) => {
  const { message,currentmodel } = req.body;
  const response = await openai.createCompletion({
    model: `${currentmodel}` , 
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  console.log(response.data.choices[0].text);
  res.json({
    message: response.data.choices[0].text,
  });
});


//get engine
app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
console.log(response.data.data.data)
  res.json({
      models: response.data
    });
});

app.listen(port, () => {
  console.log(port);
});

// import  express  from "express";
// import bodyParser from "body-parser";
// import cors  from "cors";
// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-sdD8Q5Cm747MElmQosYUU7hL",
//     apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);
// const app=express()
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// app.use(bodyParser.json())
// app.use(cors())
// const port=5000

// app.post('/',async(req,res)=>{
//     // res.send('hello world')
//    const{message}=req.body;
//    console.log(message)
//     const response=await openai.createChatCompletion({

//         "model": "gpt-3.5-turbo",
//         // "messages": `${message}`,
//         "messages": [
//           {role:"user",content:`${message}`}
//         ],
//         "max_tokens":100,
//         "temperature": 0.5

//     });
//     console.log(response.data.choices[0].message)
//     res.json({
//         // data:message,
//         message:response.data.choices[0].message

//     })

// })

// app.listen(port,()=>{
//     console.log(port)
// })
