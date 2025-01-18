import { initServices } from "../services";
import { ArticleRatingsManager } from "./article-ratings-manager";
import { ArticlesManager } from "./articles-manager";
import { CommentsManager } from "./comments-manager";
import { EmailManager } from "./email-manager";
import { LoginManager } from "./login-manager";
import { NotificationsManager } from "./notifications-manager";
import { ProfileManager } from "./profile-manager";
import { UserManager } from "./user-manager";

export const initManagers = (appServices: ReturnType<typeof initServices>) => {
  const {
    articleRatingsService,
    articlesService,
    commentsService,
    loginService,
    userService,
    jwtService,
    profileService,
    notificationsService,
    emailService,
  } = appServices;

  const articleRatingsManager = new ArticleRatingsManager(
    articleRatingsService
  );
  const articlesManager = new ArticlesManager(articlesService);
  const commentsManager = new CommentsManager(commentsService);
  const loginManager = new LoginManager(loginService);
  const userManager = new UserManager(userService, jwtService);
  const profileManager = new ProfileManager(profileService);
  const notificationsManager = new NotificationsManager(notificationsService);
  const emailManager = new EmailManager(emailService);

  return {
    articleRatingsManager,
    articlesManager,
    commentsManager,
    loginManager,
    userManager,
    profileManager,
    notificationsManager,
    emailManager,
  };
};
