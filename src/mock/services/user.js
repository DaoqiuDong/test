import Mock from "mockjs";
import { builder } from "../util";

const notice = () => {
  const data = Mock.mock({
    "data|1-3": [
      {
        "title|+1": ["Hello", "Mock.js"],
      },
    ],
  });
  return builder(data);
};

const applyList = () => {
  const data = Mock.mock({
    "data|8-23": [
      {
        "title|+1": ["Hello", "Mock.js"],
      },
    ],
  });
  return builder(data);
};

const authData = () => {
  return builder({
    result: "1",
    lastLogin: Mock.Random.date("yyyy-MM-dd"),
    lastLoginIp: Mock.Random.ip(),
    orgCode: "91440606338202486K",
    legalName: "xxx",
    legalId: Mock.Random.id(),
  });
};

const qrData = () => {
  return builder({
    code: "200",
    data: [{}, '{"url":"https://www.baidu.com"}'],
    lastLogin: Mock.Random.date("yyyy-MM-dd"),
    lastLoginIp: Mock.Random.ip(),
    orgCode: "91440606338202486K",
    legalName: "xxx",
    legalId: Mock.Random.id(),
  });
};

Mock.mock(/\/api\/notice\/listByIndex/, "post", notice);
Mock.mock(/\/api\/apply\/listByIndex/, "post", applyList);
Mock.mock(/\/api\/apply\/listIndex/, "post", applyList);
Mock.mock(/\/api\/authentication\/enterprise/, "post", authData);
Mock.mock("/api/apply/application/sign", "post", qrData);
