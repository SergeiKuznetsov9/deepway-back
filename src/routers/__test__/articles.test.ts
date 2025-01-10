import request from "supertest";
import { Db, WithId } from "mongodb";
import { createApp } from "../../app";
import { initTestDB } from "../../../jest.setup";
import { getUsersMocks } from "../../mocks/users";
import { getArticlesMocks } from "../../mocks/articles";
import { Article, ArticlesGetQuery } from "../../types/models/article-types";
import { ErrorMessage } from "../../types/models/messages-types";

const checkRightNumberSubsequence = (
  order: "asc" | "desc",
  checkingArray: number[]
) =>
  checkingArray.every((number, index) => {
    if (index > 0 && order === "asc") {
      return number >= checkingArray[index - 1];
    }

    if (index > 0 && order === "desc") {
      return number <= checkingArray[index - 1];
    }

    return true;
  });

let app: ReturnType<typeof createApp>;

beforeAll(async () => {
  let db: Db;
  ({ app, db } = await initTestDB());
  await db.collection("articles").insertMany(getArticlesMocks());
  await db.collection("users").insertMany(getUsersMocks());
});

describe("Articles API", () => {
  it("GET /articles", async () => {
    const res = await request(app).get("/articles");
    expect(res.body.length).toBe(21);
  });

  it("GET /articles?_limit=9", async () => {
    const query = {
      _limit: 9,
    };
    const res = await request(app).get("/articles").query(query);
    expect(res.body.length).toBe(9);
  });

  it("GET /articles?_limit=9&_page=2", async () => {
    const query = {
      _limit: 3,
      _page: 2,
    };
    const correctResultsIds = [
      "670e4a0655e53c8e6099fcf5",
      "670e4a0655e53c8e6099fcf6",
      "670e4a0655e53c8e6099fcf7",
    ];
    const res = await request(app).get("/articles").query(query);
    const resIdsArray = res.body.map((article: WithId<Article>) => article._id);
    expect(resIdsArray).toEqual(correctResultsIds);
  });

  it("GET /articles?_expand=user", async () => {
    const query = {
      _expand: "user",
    };
    const res = await request(app).get("/articles").query(query);
    const isUserInArticle = res.body.every(
      (article: Article) => "user" in article
    );
    expect(isUserInArticle).toBe(true);
  });

  it("GET /articles?q=reac", async () => {
    const query = {
      q: "reac",
    };
    const res = await request(app).get("/articles").query(query);
    const isQMatchesWithResult = res.body.every((article: Article) =>
      article.title.toLowerCase().includes(query.q)
    );
    expect(isQMatchesWithResult).toBe(true);
  });

  it("GET /articles?q=feshjfjehbdwadw", async () => {
    const query = {
      q: "feshjfjehbdwadw",
    };
    const res = await request(app).get("/articles").query(query);
    expect(res.body.length).toBe(0);
  });

  it("GET /articles?type=IT", async () => {
    const query = {
      type: "IT",
    };
    const res = await request(app).get("/articles").query(query);
    const isAllTypesMatches = res.body.every((article: Article) =>
      article.type.includes("IT")
    );
    expect(isAllTypesMatches).toBe(true);
  });

  it("GET /articles?type=ECONOMICS", async () => {
    const query = {
      type: "ECONOMICS",
    };
    const res = await request(app).get("/articles").query(query);
    const isAllTypesMatches = res.body.every((article: Article) =>
      article.type.includes("ECONOMICS")
    );
    expect(isAllTypesMatches).toBe(true);
  });

  it("GET /articles?type=SCIENCE", async () => {
    const query = {
      type: "SCIENCE",
    };
    const res = await request(app).get("/articles").query(query);
    const isAllTypesMatches = res.body.every((article: Article) =>
      article.type.includes("SCIENCE")
    );
    expect(isAllTypesMatches).toBe(true);
  });

  it("GET /articles?_sort=created&_order=asc", async () => {
    const query: {
      _sort: ArticlesGetQuery["_sort"];
      _order: ArticlesGetQuery["_order"];
    } = {
      _sort: "created",
      _order: "asc",
    };
    const res = await request(app).get("/articles").query(query);
    const datesArray: number[] = res.body.map((article: Article) => {
      const articleDate = article.createdAt;
      const [day, month, year] = articleDate.split(".").map(Number);
      return new Date(year, month - 1, day).getTime();
    });
    const isCorrectSubsequence = checkRightNumberSubsequence(
      query._order,
      datesArray
    );
    expect(isCorrectSubsequence).toBe(true);
  });

  it("GET /articles?_sort=created&_order=desc", async () => {
    const query: {
      _sort: ArticlesGetQuery["_sort"];
      _order: ArticlesGetQuery["_order"];
    } = {
      _sort: "created",
      _order: "desc",
    };
    const res = await request(app).get("/articles").query(query);
    const datesArray: number[] = res.body.map((article: Article) => {
      const articleDate = article.createdAt;
      const [day, month, year] = articleDate.split(".").map(Number);
      return new Date(year, month - 1, day).getTime();
    });
    const isCorrectSubsequence = checkRightNumberSubsequence(
      query._order,
      datesArray
    );
    expect(isCorrectSubsequence).toBe(true);
  });

  it("GET /articles?_sort=views&_order=asc", async () => {
    const query: {
      _sort: ArticlesGetQuery["_sort"];
      _order: ArticlesGetQuery["_order"];
    } = {
      _sort: "views",
      _order: "asc",
    };
    const res = await request(app).get("/articles").query(query);
    const viewsArray: number[] = res.body.map(
      (article: Article) => article.views
    );
    const isCorrectSubsequence = checkRightNumberSubsequence(
      query._order,
      viewsArray
    );
    expect(isCorrectSubsequence).toBe(true);
  });

  it("GET /articles?_sort=views&_order=desc", async () => {
    const query: {
      _sort: ArticlesGetQuery["_sort"];
      _order: ArticlesGetQuery["_order"];
    } = {
      _sort: "views",
      _order: "desc",
    };
    const res = await request(app).get("/articles").query(query);
    const viewsArray: number[] = res.body.map(
      (article: Article) => article.views
    );
    const isCorrectSubsequence = checkRightNumberSubsequence(
      query._order,
      viewsArray
    );
    expect(isCorrectSubsequence).toBe(true);
  });

  it("GET /articles with invalid data", async () => {
    const query = {
      _expand: "user1",
      _sort: "createdd",
      _page: "f",
      _limit: "f",
      _order: "descc",
      q: "s",
      type: "ALLL",
    };
    const res = await request(app).get("/articles").query(query);
    const body = res.body as ErrorMessage;
    expect(body).toEqual({
      error:
        'The value of "_expand" must be user; The value of "_sort" must be created or title or views; The value of "_sort" must be desc or asc; The value of "_page" must be a number; The value of "_limit" must be a number; The value of "type" must be ALL or IT or ECONOMICS or SCIENCE; The value of "q" is less than 3 chars',
    });
  });

  it("GET /articles/670e4a0655e53c8e6099fcf7", async () => {
    const res = await request(app).get("/articles/670e4a0655e53c8e6099fcf7");

    expect(res.body._id).toBe("670e4a0655e53c8e6099fcf7");
  });

  it("GET /articles/670e4a0655e53c8e6099fcf7f", async () => {
    const res = await request(app).get("/articles/670e4a0655e53c8e6099fcf7f");
    const body = res.body as ErrorMessage;
    expect(body).toEqual({ error: "Invalid article id" });
  });
});
