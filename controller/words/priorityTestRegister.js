const { priorityWord, user_priority_word } = require("../../models");

module.exports = {
  post: (req, res) => {
    let { userid } = req.session;
    // console.log("userid", req.session.userid);
    //유저 아이디 확인
    //조인 테이블에 해당 필드 다찾기
    //해당 필드에 해당되는 priorityword테이블에서 단어 찾아서 보내기

    if (userid) {
      let array = req.body;
      console.log("바디값", req.body);
      if (Array.isArray(array)) {
        for (let i = 0; i < array.length; i++) {
          user_priority_word
            .update(
              {
                user_id: array[i].id,

                distinguish: 0,

                // tDate.setDate(tDate.getDate() + 1),
              },
              {
                where: {
                  id: data.id,
                },
              }
            )
            .then((data) => {
              //mineword distinguish 값 0으로 변경
              if (data) {
                priorityword.update(
                  {
                    check_in: new Date(),
                    check_out: new Date(),
                    // tDate.setDate(tDate.getDate() + 1),
                  },
                  {
                    where: {
                      id: data.priority_word_id,
                    },
                  }
                );

                res.status(201).json("register test success");
              } else {
                res.status(400).send("잘못된 요청");
              }
            });
        }
      } else {
        priorityWord
          .findOne({
            where: {
              word_eng: array.word_eng,
            },
          })
          .then((data) => {
            //mineword distinguish 값 0으로 변경
            if (data) {
              console.log("마인워드 데이타", data.dataValues.id);

              user_priority_word.create({
                user_id: userid.id,
                priority_word_id: data.dataValues.id,
                distinguish: 0,
                check_in: new Date(),
                check_out: new Date(),
                // tDate.setDate(tDate.getDate() + 1),
              });
              res.status(201).json("register test success");
            } else {
              res.status(400).send("잘못된 요청");
            }
          });
      }
    }
  },
};