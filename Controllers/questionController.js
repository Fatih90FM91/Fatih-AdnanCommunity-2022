const Question =require('../models/questionModel');


const addQuestionFunc = (req, res) => {
    res.render('questions/askQuestion', {pageTitle: 'Ask Question'});
}



const showQuestion =(req,res) =>{
 

    Question.find()
    .then(questions =>{
       
        res.render('questions/showQuestion', {pageTitle: 'Home', questions } );
    })
    .catch(err=>{
        console.log(err)
    })
    
   
   }
   

const questions = (req,res) =>{

    if (req.method=='GET') {

        res.render('questions/askQuestion' , {pageTitle:'Post question'})
    }

    if (req.method=='POST') {

        const {question,description} =req.body;
        const {id} = res.locals.user;
       console.log(id);
        const newQuestion = new Question({question,description ,user_id:id});
          newQuestion.save()
           .then(() =>{
           
            res.redirect('/showQuestion');
        })
        .catch(err=>{
            console.log(err)
        })
        
       
      
       
    }

}

//---------------------------------------------------------------------------------------------------------
const delQuestion =(req,res) =>{
Question.findByIdAndDelete(req.params.id)
.then( ()=> {
 res.redirect('/showQuestion');

})
.catch(err=>{
    console.log(err)
})
}


const updateQuestion =(req,res) =>{

    if (req.method==='GET') {
        Question.findById(req.params.id)
        .then(question=> {
            res.render('questions/editQuestion' ,{pageTitle:'edit Question' ,question})
        })
        .catch(err => console.log(err))
    }

    
    if (req.method==='POST') {
        Question.findByIdAndUpdate(req.params.id,req.body)
        .then(result=>{
              res.redirect('/showQuestion')
        })
        .catch(err =>console.log(err))
        
    }
}

module.exports = {
    addQuestionFunc,
    questions,
    showQuestion,
    delQuestion,
    updateQuestion,
}