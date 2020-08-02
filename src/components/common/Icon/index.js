import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faRedoAlt,
  faPlus,
  faAd,
  faAddressBook,
  faAddressCard,
  faAdjust,
  faAirFreshener,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faAmbulance,
  faAnchor,
  faAnkh,
  faArchive,
  faAppleAlt,
  faArchway,
  faArrowAltCircleDown,
  faArrowsAlt,
  faAsterisk,
  faAt,
  faAtlas,
  faAtom,
  faAudioDescription,
  faAward,
  faBaby,
  faBabyCarriage,
  faBacon,
  faBahai,
  faBalanceScale,
  faBan,
  faBars,
  faBaseballBall,
  faBell,
  faBellSlash,
  faBezierCurve,
  faBinoculars,
  faBiohazard,
  faBirthdayCake,
  faBlog,
  faBold,
  faBolt,
  faBomb,
  faBone,
  faBong,
  faBook,
  faBookDead,
  faBookMedical,
  faBookOpen,
  faBookReader,
  faBookmark,
  faBorderAll,
  faBorderStyle,
  faBox,
  faBoxOpen,
  faBoxes,
  faBraille,
  faBrain,
  faBreadSlice,
  faBriefcase,
  faBriefcaseMedical,
  faBroadcastTower,
  faBroom,
  faBrush,
  faBug,
  faBuilding,
  faBullhorn,
  faBullseye,
  faBurn,
  faBus,
  faCamera,
  faCampground,
  faCannabis,
  faCapsules,
  faCar,
  faCaravan,
  faCarrot,
  faCartArrowDown,
  faCartPlus,
  faCashRegister,
  faCat,
  faCertificate,
  faChair,
  faChalkboard,
  faChalkboardTeacher,
  faChargingStation,
  faChartArea,
  faChartBar,
  faChartLine,
  faChartPie,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faCheckSquare,
  faCheese,
  faChess,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
  faChild,
  faChurch,
  faCircle,
  faCity,
  faClinicMedical,
  faClipboard,
  faClipboardCheck,
  faClipboardList,
  faClock,
  faClone,
  faCloud,
  faCloudDownloadAlt,
  faCloudMeatball,
  faCloudMoon,
  faCloudMoonRain,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faCloudSunRain,
  faCloudUploadAlt,
  faCocktail,
  faCode,
  faCodeBranch,
  faCoffee,
  faCog,
  faCogs,
  faCoins,
  faColumns,
  faComment,
  faCommentAlt,
  faCommentDollar,
  faCommentDots,
  faCommentMedical,
  faCommentSlash,
  faComments,
  faCommentsDollar,
  faCompass,
  faCompress,
  faCompressArrowsAlt,
  faConciergeBell,
  faCookieBite,
  faCopy,
  faCopyright,
  faCouch,
  faCreditCard,
  faCrop,
  faCropAlt,
  faCross,
  faCrosshairs,
  faCrow,
  faCrown,
  faCube,
  faCubes,
  faCut,
  faDatabase,
  faDemocrat,
  faDesktop,
  faDharmachakra,
  faDice,
  faDiceD6,
  faDna,
  faDog,
  faDollarSign,
  faDolly,
  faDollyFlatbed,
  faDonate,
  faDoorClosed,
  faDoorOpen,
  faDove,
  faDownload,
  faDraftingCompass,
  faDrawPolygon,
  faDumbbell,
  faEdit,
  faEgg,
  faEject,
  faEllipsisH,
  faEllipsisV,
  faEnvelope,
  faEnvelopeOpen,
  faEnvelopeOpenText,
  faEnvelopeSquare,
  faEquals,
  faEraser,
  faEuroSign,
  faExchangeAlt,
  faExclamation,
  faExclamationCircle,
  faFax,
  faFeather,
  faFemale,
  faFighterJet,
  faFile,
  faFileAlt,
  faFileArchive,
  faFileAudio,
  faFileCode,
  faFileContract,
  faFileCsv,
  faFileDownload,
  faFileExport,
  faFileImage,
  faFileImport,
  faFileInvoice,
  faFileInvoiceDollar,
  faFileMedical,
  faFileMedicalAlt,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  faFill,
  faFillDrip,
  faFingerprint,
  faFire,
  faFireAlt,
  faFireExtinguisher,
  faFlag,
  faFlask,
  faFolder,
  faFolderMinus,
  faFolderOpen,
  faFolderPlus,
  faFont,
  faFrog,
  faFunnelDollar,
  faFutbol,
  faGamepad,
  faGasPump,
  faGavel,
  faGem,
  faGenderless,
  faGhost,
  faGift,
  faGifts,
  faGlassCheers,
  faGlassMartini,
  faGlassMartiniAlt,
  faGlasses,
  faGlobe,
  faGreaterThan,
  faGreaterThanEqual,
  faGripHorizontal,
  faGripLines,
  faGripLinesVertical,
  faGripVertical,
  faGuitar,
  faHSquare,
  faHamburger,
  faHands,
  faHandsHelping,
  faHandshake,
  faHashtag,
  faHatCowboy,
  faHeading,
  faHeadphones,
  faHeart,
  faHelicopter,
  faHistory,
  faHockeyPuck,
  faHome,
  faHorse,
  faHospitalSymbol,
  faHotel,
  faHourglassHalf,
  faIceCream,
  faIdBadge,
  faIdCard,
  faIdCardAlt,
  faImage,
  faImages,
  faInbox,
  faIndent,
  faInfinity,
  faInfo,
  faInfoCircle,
  faItalic,
  faKey,
  faKeyboard,
  faLanguage,
  faLaptop,
  faLaptopCode,
  faLaptopMedical,
  faLayerGroup,
  faLightbulb,
  faLink,
  faList,
  faListAlt,
  faListOl,
  faListUl,
  faLocationArrow,
  faLock,
  faLockOpen,
  faMap,
  faMapMarkedAlt,
  faMapMarker,
  faMapMarkerAlt,
  faMapPin,
  faMapSigns,
  faMarker,
  faMars,
  faMarsDouble,
  faMarsStroke,
  faMarsStrokeH,
  faMarsStrokeV,
  faMedal,
  faMercury,
  faMicrophone,
  faMicrophoneSlash,
  faMouse,
  faPaperclip,
  faPen,
  faPhone,
  faPhoneSlash,
  faPhotoVideo,
  faPlay,
  faPlayCircle,
  faPodcast,
  faPoll,
  faPollH,
  faPoo,
  faReply,
  faRocket,
  faRssSquare,
  faShareSquare,
  faShoppingBasket,
  faSlidersH,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faSortAlphaUp,
  faSortAlphaUpAlt,
  faSortAmountDown,
  faSortAmountDownAlt,
  faSortAmountUp,
  faSortAmountUpAlt,
  faStar,
  faTextHeight,
  faTextWidth,
  faThList,
  faThumbsDown,
  faThumbsUp,
  faToggleOff,
  faToggleOn,
  faVideo,
  faVolumeDown,
  faVolumeMute,
  faVolumeOff,
  faVolumeUp,
  faWallet,
  faArrowCircleRight,
  faUniversity,
  faPlusCircle,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  fa500px,
  faAccessibleIcon,
  faAccusoft,
  faAcquisitionsIncorporated,
  faAdn,
  faAdobe,
  faAdversal,
  faAffiliatetheme,
  faAirbnb,
  faAlipay,
  faAlgolia,
  faAmazon,
  faAmazonPay,
  faAmilia,
  faAndroid,
  faAngellist,
  faAngrycreative,
  faAngular,
  faAppStore,
  faAppStoreIos,
  faApper,
  faApple,
  faApplePay,
  faArtstation,
  faAsymmetrik,
  faAtlassian,
  faAudible,
  faAutoprefixer,
  faAvianex,
  faAviato,
  faAws,
  faBandcamp,
  faBehance,
  faBehanceSquare,
  faBimobject,
  faBitbucket,
  faBitcoin,
  faBity,
  faBlackTie,
  faBlackberry,
  faBlogger,
  faBloggerB,
  faBluetooth,
  faBluetoothB,
  faCcApplePay,
  faCcDinersClub,
  faCcDiscover,
  faCcJcb,
  faCcMastercard,
  faCcPaypal,
  faCcStripe,
  faCcVisa,
  faCentercode,
  faCentos,
  faChrome,
  faChromecast,
  faCloudscale,
  faCloudsmith,
  faCloudversify,
  faCodepen,
  faCodiepie,
  faConfluence,
  faConnectdevelop,
  faContao,
  faCottonBureau,
  faCpanel,
  faCreativeCommons,
  faCriticalRole,
  faCss3,
  faCss3Alt,
  faDeskpro,
  faDev,
  faDhl,
  faDocker,
  faEbay,
  faEdge,
  faElementor,
  faEllo,
  faEmber,
  faEmpire,
  faEnvira,
  faErlang,
  faEthereum,
  faEtsy,
  faEvernote,
  faExpeditedssl,
  faFacebook,
  faFacebookF,
  faFacebookMessenger,
  faFacebookSquare,
  faFantasyFlightGames,
  faFedex,
  faFedora,
  faFigma,
  faFirefox,
  faFirefoxBrowser,
  faFirstOrder,
  faFirstOrderAlt,
  faFlickr,
  faFlipboard,
  faFly,
  faFontAwesome,
  faFontAwesomeAlt,
  faFontAwesomeFlag,
  faFonticons,
  faFonticonsFi,
  faFortAwesome,
  faFortAwesomeAlt,
  faForumbee,
  faFoursquare,
  faFreeCodeCamp,
  faFreebsd,
  faFulcrum,
  faGalacticRepublic,
  faGalacticSenate,
  faGetPocket,
  faGg,
  faGgCircle,
  faGit,
  faGitAlt,
  faGitSquare,
  faGithub,
  faGithubAlt,
  faGithubSquare,
  faGitkraken,
  faGitlab,
  faGlide,
  faGlideG,
  faGofore,
  faGoodreads,
  faGoodreadsG,
  faGoogle,
  faGoogleDrive,
  faGooglePlay,
  faGoogleWallet,
  faGratipay,
  faGrav,
  faGripfire,
  faGrunt,
  faGulp,
  faHackerrank,
  faHips,
  faHireAHelper,
  faHooli,
  faHornbill,
  faHotjar,
  faHouzz,
  faHtml5,
  faHubspot,
  faIdeal,
  faImdb,
  faInstagram,
  faIntercom,
  faInternetExplorer,
  faInvision,
  faIoxhost,
  faItchIo,
  faItunes,
  faJava,
  faJediOrder,
  faJenkins,
  faJira,
  faJoget,
  faJoomla,
  faJs,
  faJsSquare,
  faJsfiddle,
  faKaggle,
  faKeybase,
  faKeycdn,
  faKickstarter,
  faKickstarterK,
  faKorvue,
  faLaravel,
  faLyft,
  faMagento,
  faMailchimp,
  faMandalorian,
  faMarkdown,
  faMastodon,
  faMaxcdn,
  faMdb,
  faMedapps,
  faMedium,
  faMediumM,
  faMedrt,
  faMeetup,
  faMegaport,
  faMendeley,
  faMicroblog,
  faMicrosoft,
  faMix,
  faNpm,
  faNs8,
  faNutritionix,
  faOdnoklassniki,
  faOdnoklassnikiSquare,
  faOldRepublic,
  faOpencart,
  faOpenid,
  faOpera,
  faOptinMonster,
  faOrcid,
  faOsi,
  faPage4,
  faPagelines,
  faPalfed,
  faPatreon,
  faPaypal,
  faPennyArcade,
  faPeriscope,
  faPhabricator,
  faPhoenixSquadron,
  faPhp,
  faPiedPiper,
  faPiedPiperHat,
  faPiedPiperPp,
  faPiedPiperSquare,
  faPinterest,
  faPinterestP,
  faPinterestSquare,
  faPlaystation,
  faProductHunt,
  faPushed,
  faPython,
  faQq,
  faQuinscape,
  faQuora,
  faRProject,
  faRaspberryPi,
  faRavelry,
  faReact,
  faReacteurope,
  faReadme,
  faRebel,
  faRedRiver,
  faReddit,
  faRedditAlien,
  faRedditSquare,
  faRedhat,
  faReplyd,
  faResearchgate,
  faResolving,
  faRev,
  faRocketchat,
  faRockrms,
  faSafari,
  faSalesforce,
  faSass,
  faSchlix,
  faScribd,
  faSearchengin,
  faShopware,
  faSimplybuilt,
  faSistrix,
  faSith,
  faSketch,
  faSkyatlas,
  faSkype,
  faSlack,
  faSlackHash,
  faSlideshare,
  faSnapchat,
  faSnapchatGhost,
  faSnapchatSquare,
  faSoundcloud,
  faSourcetree,
  faSpeakap,
  faSpeakerDeck,
  faSpotify,
  faSquarespace,
  faStackExchange,
  faStackOverflow,
  faStackpath,
  faStaylinked,
  faSteam,
  faSteamSquare,
  faSteamSymbol,
  faStickerMule,
  faStrava,
  faStripe,
  faStripeS,
  faStudiovinari,
  faStumbleupon,
  faStumbleuponCircle,
  faSuperpowers,
  faSupple,
  faSuse,
  faSwift,
  faSymfony,
  faTeamspeak,
  faTelegram,
  faTelegramPlane,
  faTencentWeibo,
  faTheRedYeti,
  faThemeco,
  faThemeisle,
  faThinkPeaks,
  faTradeFederation,
  faTrello,
  faTripadvisor,
  faTumblr,
  faTumblrSquare,
  faTwitch,
  faTwitter,
  faTwitterSquare,
  faTypo3,
  faUber,
  faUnity,
  faUntappd,
  faUps,
  faUsb,
  faUsps,
  faUssunnah,
  faVaadin,
  faViacoin,
  faViadeo,
  faViadeoSquare,
  faViber,
  faVimeo,
  faVimeoV,
  faVimeoSquare,
  faVine,
  faVk,
  faVnv,
  faVuejs,
  faWaze,
  faWeebly,
  faWeibo,
  faWeixin,
  faWhatsapp,
  faWhatsappSquare,
  faWhmcs,
  faWikipediaW,
  faWindows,
  faWix,
  faWizardsOfTheCoast,
  faWolfPackBattalion,
  faWordpress,
  faWordpressSimple,
  faWpbeginner,
  faWpexplorer,
  faWpforms,
  faWpressr,
  faXbox,
  faXing,
  faXingSquare,
  faYCombinator,
  faYahoo,
  faYammer,
  faYandex,
  faYarn,
  faYelp,
  faYoast,
  faYoutube,
  faYoutubeSquare,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';

import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowAltCircleUp,
  faCalendar,
  faCalendarAlt,
  faCalendarCheck,
  faCalendarMinus,
  faCalendarPlus,
  faCalendarTimes,
  faClosedCaptioning,
  faDotCircle,
  faEye,
  faEyeSlash,
  faFileExcel,
  faHandPointDown,
  faHandPointLeft,
  faHandPointRight,
  faHandPointUp,
  faMoneyBillAlt,
  faNewspaper,
  faObjectGroup,
  faObjectUngroup,
  faPaperPlane,
  faPauseCircle,
  faQuestionCircle,
  faRegistered,
  faTimesCircle,
  faTrashAlt,
  faUser,
  faUserCircle,
  faWindowMinimize,
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faPlusSquare
} from '@fortawesome/free-regular-svg-icons';

import './index.scss';

const icons = {
  plusSquare: faPlusSquare,
  redoAlt: faRedoAlt,
  plus: faPlus,
  accessibleIcon: faAccessibleIcon,
  accusoft: faAccusoft,
  acquisitionsIncorporated: faAcquisitionsIncorporated,
  addressBook: faAddressBook,
  addressCard: faAddressCard,
  adjust: faAdjust,
  adn: faAdn,
  adobe: faAdobe,
  adversal: faAdversal,
  affiliatetheme: faAffiliatetheme,
  airFreshener: faAirFreshener,
  airbnb: faAirbnb,
  algolia: faAlgolia,
  alignCenter: faAlignCenter,
  alignJustify: faAlignJustify,
  alignLeft: faAlignLeft,
  alignRight: faAlignRight,
  alipay: faAlipay,
  amazon: faAmazon,
  amazonPay: faAmazonPay,
  ambulance: faAmbulance,
  amilia: faAmilia,
  anchor: faAnchor,
  android: faAndroid,
  angellist: faAngellist,
  angrycreative: faAngrycreative,
  angular: faAngular,
  ankh: faAnkh,
  appStore: faAppStore,
  appStoreIos: faAppStoreIos,
  apper: faApper,
  apple: faApple,
  appleAlt: faAppleAlt,
  applePay: faApplePay,
  archive: faArchive,
  archway: faArchway,
  arrowAltCircleDown: faArrowAltCircleDown,
  arrowAltCircleLeft: faArrowAltCircleLeft,
  arrowAltCircleRight: faArrowAltCircleRight,
  arrowAltCircleUp: faArrowAltCircleUp,
  arrowsAlt: faArrowsAlt,
  artstation: faArtstation,
  asterisk: faAsterisk,
  asymmetrik: faAsymmetrik,
  at: faAt,
  atlas: faAtlas,
  atlassian: faAtlassian,
  atom: faAtom,
  audible: faAudible,
  audioDescription: faAudioDescription,
  autoprefixer: faAutoprefixer,
  avianex: faAvianex,
  aviato: faAviato,
  award: faAward,
  aws: faAws,
  baby: faBaby,
  babyCarriage: faBabyCarriage,
  bacon: faBacon,
  bahai: faBahai,
  balanceScale: faBalanceScale,
  ban: faBan,
  bandcamp: faBandcamp,
  bars: faBars,
  baseballBall: faBaseballBall,
  behance: faBehance,
  behanceSquare: faBehanceSquare,
  bell: faBell,
  bellSlash: faBellSlash,
  bezierCurve: faBezierCurve,
  bimobject: faBimobject,
  binoculars: faBinoculars,
  biohazard: faBiohazard,
  birthdayCake: faBirthdayCake,
  bitbucket: faBitbucket,
  bitcoin: faBitcoin,
  bity: faBity,
  blackTie: faBlackTie,
  blackberry: faBlackberry,
  blog: faBlog,
  blogger: faBlogger,
  bloggerB: faBloggerB,
  bluetooth: faBluetooth,
  bluetoothB: faBluetoothB,
  bold: faBold,
  bolt: faBolt,
  bomb: faBomb,
  bone: faBone,
  bong: faBong,
  book: faBook,
  bookDead: faBookDead,
  bookMedical: faBookMedical,
  bookOpen: faBookOpen,
  bookReader: faBookReader,
  bookmark: faBookmark,
  borderAll: faBorderAll,
  borderStyle: faBorderStyle,
  box: faBox,
  boxOpen: faBoxOpen,
  boxes: faBoxes,
  braille: faBraille,
  brain: faBrain,
  breadSlice: faBreadSlice,
  briefcase: faBriefcase,
  briefcaseMedical: faBriefcaseMedical,
  broadcastTower: faBroadcastTower,
  broom: faBroom,
  brush: faBrush,
  bug: faBug,
  building: faBuilding,
  bullhorn: faBullhorn,
  bullseye: faBullseye,
  burn: faBurn,
  bus: faBus,
  calendar: faCalendar,
  calendarAlt: faCalendarAlt,
  calendarCheck: faCalendarCheck,
  calendarMinus: faCalendarMinus,
  calendarPlus: faCalendarPlus,
  calendarTimes: faCalendarTimes,
  camera: faCamera,
  campground: faCampground,
  cannabis: faCannabis,
  capsules: faCapsules,
  car: faCar,
  caravan: faCaravan,
  carrot: faCarrot,
  cartArrowDown: faCartArrowDown,
  cartPlus: faCartPlus,
  cashRegister: faCashRegister,
  cat: faCat,
  ccApplePay: faCcApplePay,
  ccDinersClub: faCcDinersClub,
  ccDiscover: faCcDiscover,
  ccJcb: faCcJcb,
  ccMastercard: faCcMastercard,
  ccPaypal: faCcPaypal,
  ccStripe: faCcStripe,
  ccVisa: faCcVisa,
  centercode: faCentercode,
  centos: faCentos,
  certificate: faCertificate,
  chair: faChair,
  chalkboard: faChalkboard,
  chalkboardTeacher: faChalkboardTeacher,
  chargingStation: faChargingStation,
  chartArea: faChartArea,
  chartBar: faChartBar,
  chartLine: faChartLine,
  chartPie: faChartPie,
  check: faCheck,
  checkCircle: faCheckCircle,
  checkDouble: faCheckDouble,
  checkSquare: faCheckSquare,
  cheese: faCheese,
  chess: faChess,
  chessKing: faChessKing,
  chessKnight: faChessKnight,
  chessPawn: faChessPawn,
  chessQueen: faChessQueen,
  chessRook: faChessRook,
  child: faChild,
  chrome: faChrome,
  chromecast: faChromecast,
  church: faChurch,
  circle: faCircle,
  city: faCity,
  clinicMedical: faClinicMedical,
  clipboard: faClipboard,
  clipboardCheck: faClipboardCheck,
  clipboardList: faClipboardList,
  clock: faClock,
  clone: faClone,
  closedCaptioning: faClosedCaptioning,
  cloud: faCloud,
  cloudDownloadAlt: faCloudDownloadAlt,
  cloudMeatball: faCloudMeatball,
  cloudMoon: faCloudMoon,
  cloudMoonRain: faCloudMoonRain,
  cloudRain: faCloudRain,
  cloudShowersHeavy: faCloudShowersHeavy,
  cloudSun: faCloudSun,
  cloudSunRain: faCloudSunRain,
  cloudUploadAlt: faCloudUploadAlt,
  cloudscale: faCloudscale,
  cloudsmith: faCloudsmith,
  cloudversify: faCloudversify,
  cocktail: faCocktail,
  code: faCode,
  codeBranch: faCodeBranch,
  codepen: faCodepen,
  codiepie: faCodiepie,
  coffee: faCoffee,
  settings: faCog,
  cogs: faCogs,
  coins: faCoins,
  columns: faColumns,
  comment: faComment,
  commentAlt: faCommentAlt,
  commentDollar: faCommentDollar,
  commentDots: faCommentDots,
  commentMedical: faCommentMedical,
  commentSlash: faCommentSlash,
  comments: faComments,
  commentsDollar: faCommentsDollar,
  compass: faCompass,
  compress: faCompress,
  compressArrowsAlt: faCompressArrowsAlt,
  conciergeBell: faConciergeBell,
  confluence: faConfluence,
  connectdevelop: faConnectdevelop,
  contao: faContao,
  cookieBite: faCookieBite,
  copy: faCopy,
  copyright: faCopyright,
  cottonBureau: faCottonBureau,
  couch: faCouch,
  cpanel: faCpanel,
  creativeCommons: faCreativeCommons,
  creditCard: faCreditCard,
  criticalRole: faCriticalRole,
  crop: faCrop,
  cropAlt: faCropAlt,
  cross: faCross,
  crosshairs: faCrosshairs,
  crow: faCrow,
  crown: faCrown,
  css3: faCss3,
  css3Alt: faCss3Alt,
  cube: faCube,
  cubes: faCubes,
  cut: faCut,
  database: faDatabase,
  democrat: faDemocrat,
  deskpro: faDeskpro,
  desktop: faDesktop,
  dev: faDev,
  dharmachakra: faDharmachakra,
  dhl: faDhl,
  dice: faDice,
  diceD6: faDiceD6,
  dna: faDna,
  docker: faDocker,
  dog: faDog,
  dollarSign: faDollarSign,
  dolly: faDolly,
  dollyFlatbed: faDollyFlatbed,
  donate: faDonate,
  doorClosed: faDoorClosed,
  doorOpen: faDoorOpen,
  dotCircle: faDotCircle,
  dove: faDove,
  download: faDownload,
  draftingCompass: faDraftingCompass,
  drawPolygon: faDrawPolygon,
  dumbbell: faDumbbell,
  ebay: faEbay,
  edge: faEdge,
  edit: faEdit,
  egg: faEgg,
  eject: faEject,
  elementor: faElementor,
  ellipsisH: faEllipsisH,
  ellipsisV: faEllipsisV,
  ello: faEllo,
  ember: faEmber,
  empire: faEmpire,
  envelope: faEnvelope,
  envelopeOpen: faEnvelopeOpen,
  envelopeOpenText: faEnvelopeOpenText,
  envelopeSquare: faEnvelopeSquare,
  envira: faEnvira,
  equals: faEquals,
  eraser: faEraser,
  erlang: faErlang,
  ethereum: faEthereum,
  etsy: faEtsy,
  euroSign: faEuroSign,
  evernote: faEvernote,
  exchangeAlt: faExchangeAlt,
  exclamation: faExclamation,
  exclamationCircle: faExclamationCircle,
  expeditedssl: faExpeditedssl,
  eye: faEye,
  eyeSlash: faEyeSlash,
  '500px': fa500px,
  ad: faAd,
  facebook: faFacebook,
  facebookF: faFacebookF,
  facebookMessenger: faFacebookMessenger,
  facebookSquare: faFacebookSquare,
  fantasyFlightGames: faFantasyFlightGames,
  fax: faFax,
  feather: faFeather,
  fedex: faFedex,
  fedora: faFedora,
  female: faFemale,
  fighterJet: faFighterJet,
  figma: faFigma,
  file: faFile,
  fileAlt: faFileAlt,
  fileArchive: faFileArchive,
  fileAudio: faFileAudio,
  fileCode: faFileCode,
  fileContract: faFileContract,
  fileCsv: faFileCsv,
  fileDownload: faFileDownload,
  fileExcel: faFileExcel,
  fileExport: faFileExport,
  fileImage: faFileImage,
  fileImport: faFileImport,
  fileInvoice: faFileInvoice,
  fileInvoiceDollar: faFileInvoiceDollar,
  fileMedical: faFileMedical,
  fileMedicalAlt: faFileMedicalAlt,
  filePdf: faFilePdf,
  filePowerpoint: faFilePowerpoint,
  fileVideo: faFileVideo,
  fileWord: faFileWord,
  fill: faFill,
  fillDrip: faFillDrip,
  fingerprint: faFingerprint,
  fire: faFire,
  fireAlt: faFireAlt,
  fireExtinguisher: faFireExtinguisher,
  firefox: faFirefox,
  firefoxBrowser: faFirefoxBrowser,
  firstOrder: faFirstOrder,
  firstOrderAlt: faFirstOrderAlt,
  flag: faFlag,
  flask: faFlask,
  flickr: faFlickr,
  flipboard: faFlipboard,
  fly: faFly,
  folder: faFolder,
  folderMinus: faFolderMinus,
  folderOpen: faFolderOpen,
  folderPlus: faFolderPlus,
  font: faFont,
  fontAwesome: faFontAwesome,
  fontAwesomeAlt: faFontAwesomeAlt,
  fontAwesomeFlag: faFontAwesomeFlag,
  fonticons: faFonticons,
  fonticonsFi: faFonticonsFi,
  fortAwesome: faFortAwesome,
  fortAwesomeAlt: faFortAwesomeAlt,
  forumbee: faForumbee,
  foursquare: faFoursquare,
  freeCodeCamp: faFreeCodeCamp,
  freebsd: faFreebsd,
  frog: faFrog,
  fulcrum: faFulcrum,
  funnelDollar: faFunnelDollar,
  futbol: faFutbol,
  galacticRepublic: faGalacticRepublic,
  galacticSenate: faGalacticSenate,
  gamepad: faGamepad,
  gasPump: faGasPump,
  gavel: faGavel,
  gem: faGem,
  genderless: faGenderless,
  getPocket: faGetPocket,
  gg: faGg,
  ggCircle: faGgCircle,
  ghost: faGhost,
  gift: faGift,
  gifts: faGifts,
  git: faGit,
  gitAlt: faGitAlt,
  gitSquare: faGitSquare,
  github: faGithub,
  githubAlt: faGithubAlt,
  githubSquare: faGithubSquare,
  gitkraken: faGitkraken,
  gitlab: faGitlab,
  glassCheers: faGlassCheers,
  glassMartini: faGlassMartini,
  glassMartiniAlt: faGlassMartiniAlt,
  glasses: faGlasses,
  glide: faGlide,
  glideG: faGlideG,
  globe: faGlobe,
  gofore: faGofore,
  goodreads: faGoodreads,
  goodreadsG: faGoodreadsG,
  google: faGoogle,
  googleDrive: faGoogleDrive,
  googlePlay: faGooglePlay,
  googleWallet: faGoogleWallet,
  gratipay: faGratipay,
  grav: faGrav,
  greaterThan: faGreaterThan,
  greaterThanEqual: faGreaterThanEqual,
  gripHorizontal: faGripHorizontal,
  gripLines: faGripLines,
  gripLinesVertical: faGripLinesVertical,
  gripVertical: faGripVertical,
  gripfire: faGripfire,
  grunt: faGrunt,
  guitar: faGuitar,
  gulp: faGulp,
  hSquare: faHSquare,
  hackerrank: faHackerrank,
  hamburger: faHamburger,
  handPointDown: faHandPointDown,
  handPointLeft: faHandPointLeft,
  handPointRight: faHandPointRight,
  handPointUp: faHandPointUp,
  hands: faHands,
  handsHelping: faHandsHelping,
  handshake: faHandshake,
  hashtag: faHashtag,
  hatCowboy: faHatCowboy,
  heading: faHeading,
  headphones: faHeadphones,
  heart: faHeart,
  helicopter: faHelicopter,
  hips: faHips,
  hireAHelper: faHireAHelper,
  history: faHistory,
  hockeyPuck: faHockeyPuck,
  home: faHome,
  hooli: faHooli,
  hornbill: faHornbill,
  horse: faHorse,
  hospitalSymbol: faHospitalSymbol,
  hotel: faHotel,
  hotjar: faHotjar,
  hourglassHalf: faHourglassHalf,
  houzz: faHouzz,
  html5: faHtml5,
  hubspot: faHubspot,
  iceCream: faIceCream,
  idBadge: faIdBadge,
  idCard: faIdCard,
  idCardAlt: faIdCardAlt,
  ideal: faIdeal,
  image: faImage,
  images: faImages,
  imdb: faImdb,
  inbox: faInbox,
  indent: faIndent,
  infinity: faInfinity,
  info: faInfo,
  infoCircle: faInfoCircle,
  instagram: faInstagram,
  intercom: faIntercom,
  internetExplorer: faInternetExplorer,
  invision: faInvision,
  ioxhost: faIoxhost,
  italic: faItalic,
  itchIo: faItchIo,
  itunes: faItunes,
  java: faJava,
  jediOrder: faJediOrder,
  jenkins: faJenkins,
  jira: faJira,
  joget: faJoget,
  joomla: faJoomla,
  js: faJs,
  jsSquare: faJsSquare,
  jsfiddle: faJsfiddle,
  kaggle: faKaggle,
  key: faKey,
  keybase: faKeybase,
  keyboard: faKeyboard,
  keycdn: faKeycdn,
  kickstarter: faKickstarter,
  kickstarterK: faKickstarterK,
  korvue: faKorvue,
  language: faLanguage,
  laptop: faLaptop,
  laptopCode: faLaptopCode,
  laptopMedical: faLaptopMedical,
  laravel: faLaravel,
  layerGroup: faLayerGroup,
  lightbulb: faLightbulb,
  link: faLink,
  list: faList,
  listAlt: faListAlt,
  listOl: faListOl,
  listUl: faListUl,
  locationArrow: faLocationArrow,
  lock: faLock,
  lockOpen: faLockOpen,
  lyft: faLyft,
  magento: faMagento,
  mailchimp: faMailchimp,
  mandalorian: faMandalorian,
  map: faMap,
  mapMarkedAlt: faMapMarkedAlt,
  mapMarker: faMapMarker,
  mapMarkerAlt: faMapMarkerAlt,
  mapPin: faMapPin,
  mapSigns: faMapSigns,
  markdown: faMarkdown,
  marker: faMarker,
  mars: faMars,
  marsDouble: faMarsDouble,
  marsStroke: faMarsStroke,
  marsStrokeH: faMarsStrokeH,
  marsStrokeV: faMarsStrokeV,
  mastodon: faMastodon,
  maxcdn: faMaxcdn,
  mdb: faMdb,
  medal: faMedal,
  medapps: faMedapps,
  medium: faMedium,
  mediumM: faMediumM,
  medrt: faMedrt,
  meetup: faMeetup,
  megaport: faMegaport,
  mendeley: faMendeley,
  mercury: faMercury,
  microblog: faMicroblog,
  microphone: faMicrophone,
  microphoneSlash: faMicrophoneSlash,
  microsoft: faMicrosoft,
  mix: faMix,
  moneyBillAlt: faMoneyBillAlt,
  mouse: faMouse,
  newspaper: faNewspaper,
  npm: faNpm,
  ns8: faNs8,
  nutritionix: faNutritionix,
  objectGroup: faObjectGroup,
  objectUngroup: faObjectUngroup,
  odnoklassniki: faOdnoklassniki,
  odnoklassnikiSquare: faOdnoklassnikiSquare,
  oldRepublic: faOldRepublic,
  opencart: faOpencart,
  openid: faOpenid,
  opera: faOpera,
  optinMonster: faOptinMonster,
  orcid: faOrcid,
  osi: faOsi,
  page4: faPage4,
  pagelines: faPagelines,
  palfed: faPalfed,
  paperPlane: faPaperPlane,
  paperclip: faPaperclip,
  patreon: faPatreon,
  pauseCircle: faPauseCircle,
  pen:faPen,
  pennyArcade: faPennyArcade,
  periscope: faPeriscope,
  phabricator: faPhabricator,
  phoenixSquadron: faPhoenixSquadron,
  phone: faPhone,
  phoneSlash: faPhoneSlash,
  photoVideo: faPhotoVideo,
  php: faPhp,
  piedPiper: faPiedPiper,
  piedPiperHat: faPiedPiperHat,
  piedPiperPp: faPiedPiperPp,
  piedPiperSquare: faPiedPiperSquare,
  pinterest: faPinterest,
  pinterestP: faPinterestP,
  pinterestSquare: faPinterestSquare,
  play: faPlay,
  playCircle: faPlayCircle,
  playstation: faPlaystation,
  podcast: faPodcast,
  poll: faPoll,
  pollH: faPollH,
  poo: faPoo,
  productHunt: faProductHunt,
  pushed: faPushed,
  python: faPython,
  qq: faQq,
  questionCircle: faQuestionCircle,
  quinscape: faQuinscape,
  quora: faQuora,
  rProject: faRProject,
  raspberryPi: faRaspberryPi,
  ravelry: faRavelry,
  react: faReact,
  reacteurope: faReacteurope,
  readme: faReadme,
  rebel: faRebel,
  redRiver: faRedRiver,
  reddit: faReddit,
  redditAlien: faRedditAlien,
  redditSquare: faRedditSquare,
  redhat: faRedhat,
  registered: faRegistered,
  reply: faReply,
  replyd: faReplyd,
  researchgate: faResearchgate,
  resolving: faResolving,
  rev: faRev,
  rocket: faRocket,
  rocketchat: faRocketchat,
  rockrms: faRockrms,
  rssSquare: faRssSquare,
  safaRi: faSafari,
  salesforce: faSalesforce,
  sass: faSass,
  schlix: faSchlix,
  scribd: faScribd,
  searchengin: faSearchengin,
  shareSquare: faShareSquare,
  shoppingBasket: faShoppingBasket,
  shopware: faShopware,
  simplybuilt: faSimplybuilt,
  sistrix: faSistrix,
  sith: faSith,
  sketch: faSketch,
  skyatlas: faSkyatlas,
  skype: faSkype,
  slack: faSlack,
  slackHash: faSlackHash,
  slidersH: faSlidersH,
  slideshare: faSlideshare,
  snapchat: faSnapchat,
  snapchatGhost: faSnapchatGhost,
  snapchatSquare: faSnapchatSquare,
  sortAlphaDown: faSortAlphaDown,
  sortAlphaDownAlt: faSortAlphaDownAlt,
  sortAlphaUp: faSortAlphaUp,
  sortAlphaUpAlt: faSortAlphaUpAlt,
  sortAmountDown: faSortAmountDown,
  sortAmountDownAlt: faSortAmountDownAlt,
  sortAmountUp: faSortAmountUp,
  sortAmountUpAlt: faSortAmountUpAlt,
  soundcloud: faSoundcloud,
  sourcetree: faSourcetree,
  speakap: faSpeakap,
  speakerDeck: faSpeakerDeck,
  spotify: faSpotify,
  squarespace: faSquarespace,
  stackExchange: faStackExchange,
  stackOverflow: faStackOverflow,
  stackpath: faStackpath,
  star: faStar,
  staylinked: faStaylinked,
  steam: faSteam,
  steamSquare: faSteamSquare,
  steamSymbol: faSteamSymbol,
  stickerMule: faStickerMule,
  strava: faStrava,
  stripe: faStripe,
  stripeS: faStripeS,
  studiovinari: faStudiovinari,
  stumbleupon: faStumbleupon,
  stumbleuponCircle: faStumbleuponCircle,
  superpowers: faSuperpowers,
  supple: faSupple,
  suse: faSuse,
  swift: faSwift,
  symfony: faSymfony,
  teamspeak: faTeamspeak,
  telegram: faTelegram,
  telegramPlane: faTelegramPlane,
  tencentWeibo: faTencentWeibo,
  textHeight: faTextHeight,
  textWidth: faTextWidth,
  thList: faThList,
  theRedYeti: faTheRedYeti,
  themeco: faThemeco,
  themeisle: faThemeisle,
  thinkPeaks: faThinkPeaks,
  thumbsDown: faThumbsDown,
  thumbsUp: faThumbsUp,
  timesCircle: faTimesCircle,
  toggleOff: faToggleOff,
  toggleOn: faToggleOn,
  tradeFederation: faTradeFederation,
  trash: faTrashAlt,
  trello: faTrello,
  tripadvisor: faTripadvisor,
  tumblr: faTumblr,
  tumblrSquare: faTumblrSquare,
  twitch: faTwitch,
  twitter: faTwitter,
  twitterSquare: faTwitterSquare,
  typo3: faTypo3,
  uber: faUber,
  university: faUniversity,
  unity: faUnity,
  untappd: faUntappd,
  ups: faUps,
  usb: faUsb,
  user: faUser,
  userCircle: faUserCircle,
  usps: faUsps,
  ussunnah: faUssunnah,
  vaadin: faVaadin,
  viacoin: faViacoin,
  viadeo: faViadeo,
  viadeoSquare: faViadeoSquare,
  viber: faViber,
  video: faVideo,
  vimeo: faVimeo,
  vimeoSquare: faVimeoSquare,
  vimeoV: faVimeoV,
  vine: faVine,
  vk: faVk,
  vnv: faVnv,
  volumeDown: faVolumeDown,
  volumeMute: faVolumeMute,
  volumeOff: faVolumeOff,
  volumeUp: faVolumeUp,
  vuejs: faVuejs,
  wallet: faWallet,
  waze: faWaze,
  weebly: faWeebly,
  weibo: faWeibo,
  weixin: faWeixin,
  whatsapp: faWhatsapp,
  whatsappSquare: faWhatsappSquare,
  whmcs: faWhmcs,
  wikipediaW: faWikipediaW,
  windowClose: faWindowClose,
  windowMaximize: faWindowMaximize,
  windowMinimize: faWindowMinimize,
  windowRestore: faWindowRestore,
  windows: faWindows,
  wix: faWix,
  wizardsOfTheCoast: faWizardsOfTheCoast,
  wolfPackBattalion: faWolfPackBattalion,
  wordpress: faWordpress,
  wordpressSimple: faWordpressSimple,
  wpbeginner: faWpbeginner,
  wpexplorer: faWpexplorer,
  wpforms: faWpforms,
  wpressr: faWpressr,
  xbox: faXbox,
  xing: faXing,
  xingSquare: faXingSquare,
  yCombinator: faYCombinator,
  yahoo: faYahoo,
  yammer: faYammer,
  yandex: faYandex,
  yarn: faYarn,
  yelp: faYelp,
  yoast: faYoast,
  youtube: faYoutube,
  youtubeSquare: faYoutubeSquare,
  linkedin: faLinkedin,
  arrowCircleRight: faArrowCircleRight,
  plusCircle: faPlusCircle,
  MinusCircle: faMinusCircle
};

const selfIcons = {
  block1: null
};

const Icon = ({ type, className }) => {
  if (icons[type]) {
    return (
      <FontAwesomeIcon
        icon={icons[type]}
        className={classnames(['icon', className])}
      />
    );
  }

  

  if (selfIcons[type])
    return selfIcons[type];

  return null;
};

Icon.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string
};

Icon.defaultProps = {
  type: 'plus',
  className: null
};

export default Icon;
