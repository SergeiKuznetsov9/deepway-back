import { Db } from "mongodb";
import { ArticleRatingsService } from "./article-ratings-service";
import { ArticlesService } from "./articles-service";
import { CommentsService } from "./comments-service";
import { EmailService } from "./email-service";
import { LoginService } from "./login-service";
import { NotificationsService } from "./notifications-service";
import { ProfileService } from "./profile-service";
import { UserService } from "./user-service";
import { JwtService } from "./jwt-service";

export const initServices = (mongoDb: Db) => {
  const jwtService = new JwtService();
  const articleRatingsService = new ArticleRatingsService(mongoDb);
  const articlesService = new ArticlesService(mongoDb);
  const commentsService = new CommentsService(mongoDb);
  const loginService = new LoginService(mongoDb);
  const userService = new UserService(mongoDb);
  const profileService = new ProfileService(mongoDb);
  const notificationsService = new NotificationsService(mongoDb);
  const emailService = new EmailService();

  return {
    jwtService,
    articleRatingsService,
    articlesService,
    commentsService,
    loginService,
    userService,
    profileService,
    notificationsService,
    emailService,
  };
};
