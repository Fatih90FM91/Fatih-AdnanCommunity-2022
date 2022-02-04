
const Answer =require('../models/answerModel');
const Question =require('../models/questionModel');






const showQuestionPage =(req,res) =>{

Question.findById(req.params.id).populate('user_id', ['userName'])
.then( result => {
    Answer.find({ question_id: {$in :[ result.id ]}}).populate('user_id', ['userName'])
        .then( answers => {
            res.render('questions/qAndAnswer', {pageTitle: 'Show Question', question: result, answers})
        })
        .catch(err => console.log(err))
})
.catch(err => console.log(err))

}



const answerQuestionFunc = (req, res) => {


    if(req.method=='GET'){

 
    }
    if(req.method=='POST'){

        const { answer } = req.body;
        const question_id = req.params.id;
        const {id} = res.locals.user;
        console.log(id);
        const newAnswer = new Answer({ answer, question_id, user_id: id });
        newAnswer.save()
            .then( () => {
                console.log(newAnswer);
                res.redirect(`/qAndAnswer/${req.params.id}`)
            })
            .catch(err => console.log( err))
        
    }

}



const showQuestionFunc = (req, res) => {
    const { question,description } = req.body;
    const {id} = res.locals.user;

 

        if(req.method==='GET'){

        }

        
        if(req.method==='GET'){
            
        }
}



const refeshPage =(req,res) =>{
res.redirect(`/qAndAnswer/${req.params.id}`);
}





module.exports = {

    showQuestionFunc,
    answerQuestionFunc,
    showQuestionPage,
    refeshPage,
}