const { STATUS_CODE } = require("../constants/statusCode");
const List = require("../models/listModel");
const { MENU_LINKS } = require("../constants/navigation");

function ensureDefaultLists() {
  const defaultNames = ['Favourites', 'Read', 'To Be Read'];

  defaultNames.forEach(name => {
    if (!List.findByName(name)) {
      List.add(new List(name));
    }
  });
} 

ensureDefaultLists();


exports.getListsView = (req, res) => {

  const savedLists = List.getAll();

  const favouritesList = List.findByName("Favourites") || null;
  const readList = List.findByName("Read") || null;
  const toBeReadList = List.findByName("To Be Read") || null;


    res.render("listsPage.ejs", {
      headTitle: "Your Lists",
      path: "/lists",
      activeLinkPath: '/lists',
      menuLinks: MENU_LINKS,
      favouritesList,
      readList,
      toBeReadList,
      savedLists,
    });
  };

exports.createNewList = (req, res) => {
  const rawName = req.body.name;
  const name = rawName?.trim();
  
  const existing = List.findByName(name);
  if (existing) {
    return res.status(STATUS_CODE.CONFLICT).render("409.ejs", {
      headTitle: "409",
      menuLinks: MENU_LINKS,
      activeLinkPath: "",
    });
  }

  const newList = new List(name);
  List.add(newList);

  res.status(STATUS_CODE.FOUND).redirect("/lists");

};


exports.getListView = (request, response) => {
  const name = request.params.name;
  const list = List.findByName(name);
  const savedLists = List.getAll();

  const savedBooks = list.getBooks();

  const favouritesList = List.findByName("Favourites") || null;
  const readList = List.findByName("Read") || null;
  const toBeReadList = List.findByName("To Be Read") || null;

  response.render("list.ejs", {
    headTitle: "List",
    path: `/lists/${name}`,
    activeLinkPath: `/lists/${name}`,
    menuLinks: MENU_LINKS,
    list,
    favouritesList,
    readList,
    toBeReadList,
    savedLists,
    savedBooks,
  });
};


exports.deleteList = (req, res) => {
  const name = req.params.name;
  List.deleteByName(name);

  res.status(STATUS_CODE.OK).redirect("/lists");

};


exports.addBookToUserList = (req, res) => {
  const { id, title, authors, description, thumbnail } = req.body;
  const { name: listName } = req.params;

  if (!listName?.trim() || !id?.trim() || !title?.trim())
    return res.status(STATUS_CODE.NOT_FOUND).render("404.ejs", {
      headTitle: "404",
      menuLinks: MENU_LINKS,
      activeLinkPath: "",
    });

  let list = List.findByName(listName);
  
  if (!list) {
    return res.status(STATUS_CODE.NOT_FOUND).render("404.ejs", {
      headTitle: "404",
      menuLinks: MENU_LINKS,
      activeLinkPath: "",
    });
  }

  const added = list.addBook({ id, title, authors, description, thumbnail });
  console.log(added);
  if (!added) return res.status(STATUS_CODE.CONFLICT).render("409.ejs", {
      headTitle: "409",
      menuLinks: MENU_LINKS,
      activeLinkPath: "",
    });

  res.status(STATUS_CODE.OK).redirect(`/lists/${encodeURIComponent(listName)}`);

  
};


exports.getBooksFromUserList = (req, res) => {
  const { name: listName } = req.params;

  const list = List.findByName(listName);

  if (!list) {
    return res.status(STATUS_CODE.NOT_FOUND).render("404.ejs", {
      headTitle: "404",
      menuLinks: MENU_LINKS,
      activeLinkPath: "",
    });
  }

  res.status(STATUS_CODE.OK).json(list.getBooks());

};



exports.deleteBookFromUserList = (req, res) => {
  const { name: listName, id: bookId } = req.params;
  const list = List.findByName(listName);
  if (!list) {
    return res.status(STATUS_CODE.NOT_FOUND).render("404.ejs", {
      headTitle: "404",
      menuLinks: MENU_LINKS,
      activeLinkPath: "",
    });
  }
  
  const deleted = list.deleteBook(bookId);

  if (!deleted) 
    return res.status(STATUS_CODE.NOT_FOUND).render("404.ejs", {
      headTitle: "404",
      menuLinks: MENU_LINKS,
      activeLinkPath: "",
    });

  res.status(STATUS_CODE.OK).redirect(`/lists/${encodeURIComponent(listName)}`);

};
