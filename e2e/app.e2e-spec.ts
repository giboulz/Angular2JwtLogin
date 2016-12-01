import { LoginApplicationPage } from './app.po';

describe('login-application App', function() {
  let page: LoginApplicationPage;

  beforeEach(() => {
    page = new LoginApplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
