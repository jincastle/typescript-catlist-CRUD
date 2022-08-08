import { Request, Response } from "express";
import { Cat, CatType } from "./cats.model";

export const readAllcat = (req: Request, res: Response) => {
  try {
    const cats = Cat;
    // throw new Error("db connect error");
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: console.log("Bad Request"),
    });
  }
};

// 특정 고양이 조회
// 동적인 파라미터를 받는다(:id)
export const readCat = (req: Request, res: Response) => {
  try {
    //req 안에 있는 params에서 아이디를 빼와서 cats과 비교
    const params = req.params;
    console.log(params);
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });

    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: console.log("Bad Request"),
    });
  }
};

//고양이 등록
export const createCat = (req: Request, res: Response) => {
  try {
    //req 안에 body에서 정보를 가져와 등록
    const data = req.body;
    console.log(data);
    Cat.push(data);
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: console.log("Bad Request"),
    });
  }
};

//전체 수정
export const updateCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const data = req.body;
    let result;
    //데이터 베이스 순회(forEach)
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = data;
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error) {}
};

export const updatePartialCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const data = req.body;
    let result;
    //데이터 베이스 순회(forEach)
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        //구조분해 할당
        cat = { ...cat, ...data };
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error) {}
};

export const deleteCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    //해당 아이디 다른경우 출력
    const newCat = Cat.filter((cat) => cat.id !== params.id);
    res.status(200).send({
      success: true,
      data: { newCat },
    });
  } catch (error) {}
};
