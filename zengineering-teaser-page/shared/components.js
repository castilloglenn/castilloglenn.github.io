const sharedRoot = document.body?.dataset.root || ".";
const sharedActiveNav = document.body?.dataset.activeNav || "";

const withRoot = (path) => `${sharedRoot}/${path}`.replace(/\/\.\//g, "/");
const navHref = (anchor) => `${sharedRoot}/#${anchor}`;

const navItems = [
  ["introduction", "Introduction"],
  ["commitment", "Commitment"],
  ["service", "Service"],
  ["vision", "Vision"],
  ["company", "Company"],
  ["recruit", "Recruit"],
  ["access", "Access"],
  ["development", "Offshore Development"],
  ["contact", "Contact"],
];

const renderNavLinks = () =>
  navItems
    .map(([key, label]) => {
      const className = key === sharedActiveNav ? ' class="is-active"' : "";
      return `<a${className} href="${navHref(key)}">${label}</a>`;
    })
    .join("");

const headerMarkup = `
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand-lockup" href="${navHref("top")}" aria-label="LR TECHS, Inc.">
        <img src="${withRoot("assets/shared/lr-techs-logo-navbar.png")}" alt="LR TECHS, Inc." />
      </a>

      <nav class="desktop-nav" aria-label="Primary navigation">
        ${renderNavLinks()}
      </nav>

      <details class="mobile-nav">
        <summary aria-label="Open menu">
          <span class="menu-icon"></span>
        </summary>
        <nav class="mobile-nav__menu" aria-label="Mobile navigation">
          ${renderNavLinks()}
        </nav>
      </details>
    </div>
  </header>
`;

const footerMarkup = `
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__band">
        <div class="site-footer__brand">LR TECHS, Inc.</div>
      </div>
      <div class="site-footer__meta">
        Copyright (c) LR TECHS, INC. All Rights Reserved.
      </div>
    </div>
  </footer>
`;

document.querySelectorAll("[data-shared-header]").forEach((element) => {
  element.innerHTML = headerMarkup;
});

document.querySelectorAll("[data-shared-footer]").forEach((element) => {
  element.innerHTML = footerMarkup;
});