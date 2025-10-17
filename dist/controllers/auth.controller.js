function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import User from '../models/user.model.js';
import crypto from 'crypto';
import { createError, createToken, verifyToken } from '../utils/helpers.js';
import { cookieOptions } from '../config/cookie.js';
import { emitter } from '../loaders/events.js';
export var signup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res, next) {
    var _req$body, firstName, lastName, email, phone, gender, dob, password, existing, user, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, phone = _req$body.phone, gender = _req$body.gender, dob = _req$body.dob, password = _req$body.password;
          _context.n = 1;
          return User.findOne({
            email: email
          });
        case 1:
          existing = _context.v;
          if (!existing) {
            _context.n = 2;
            break;
          }
          throw createError('Email already registered', 400);
        case 2:
          user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            gender: gender,
            dob: dob,
            password: password,
            role: 'USER'
          });
          _context.n = 3;
          return user.save();
        case 3:
          emitter.emit('User.registered', user);
          res.status(201).json({
            message: 'Signup successful'
          });
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          next(_t);
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[0, 4]]);
  }));
  return function signup(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
export var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res, next) {
    var _req$body2, email, password, user, token, firstName, lastName, _t2, _t3;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          if (!(!email || !password)) {
            _context2.n = 1;
            break;
          }
          throw createError('Email and password are required', 400);
        case 1:
          _context2.n = 2;
          return User.findOne({
            email: email
          });
        case 2:
          user = _context2.v;
          _t2 = !user;
          if (_t2) {
            _context2.n = 4;
            break;
          }
          _context2.n = 3;
          return user.comparePassword(password);
        case 3:
          _t2 = !_context2.v;
        case 4:
          if (!_t2) {
            _context2.n = 5;
            break;
          }
          throw createError('Invalid email or password', 400);
        case 5:
          if (user.isActive) {
            _context2.n = 6;
            break;
          }
          throw createError('This account is yet to be activated', 400);
        case 6:
          _context2.n = 7;
          return createToken(user);
        case 7:
          token = _context2.v;
          res.cookie('authorization', token, cookieOptions());
          firstName = user.firstName, lastName = user.lastName;
          res.json({
            message: 'Login successful',
            user: {
              email: email,
              firstName: firstName,
              lastName: lastName
            }
          });
          _context2.n = 9;
          break;
        case 8:
          _context2.p = 8;
          _t3 = _context2.v;
          next(_t3);
        case 9:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
export var verify = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res, next) {
    var token, payload, user, _t4, _t5;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          token = req.query.token;
          if (token) {
            _context3.n = 1;
            break;
          }
          throw createError('Verification token is required', 400);
        case 1:
          _context3.p = 1;
          _context3.n = 2;
          return verifyToken(token);
        case 2:
          payload = _context3.v;
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t4 = _context3.v;
          throw createError('Invalid or expired verification token', 400);
        case 4:
          _context3.n = 5;
          return User.findById(payload.id);
        case 5:
          user = _context3.v;
          if (user) {
            _context3.n = 6;
            break;
          }
          throw createError('User not found', 404);
        case 6:
          if (!user.isActive) {
            _context3.n = 7;
            break;
          }
          return _context3.a(2, res.json({
            message: 'Email already verified.'
          }));
        case 7:
          user.isActive = true;
          _context3.n = 8;
          return user.save();
        case 8:
          res.json({
            message: 'Email verified successfully. You can now log in.'
          });
          _context3.n = 10;
          break;
        case 9:
          _context3.p = 9;
          _t5 = _context3.v;
          next(_t5);
        case 10:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 3], [0, 9]]);
  }));
  return function verify(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
export var logout = function logout(req, res) {
  res.clearCookie('authorization', {
    httpOnly: true,
    sameSite: cookieOptions().sameSite,
    secure: cookieOptions().secure
  });
  res.json({
    message: 'Logged out'
  });
};
export var forgotPassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res, next) {
    var email, user, resetToken, _t6;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          email = req.body.email;
          if (email) {
            _context4.n = 1;
            break;
          }
          throw createError('Email has been sent!', 400);
        case 1:
          _context4.n = 2;
          return User.findOne({
            email: email
          });
        case 2:
          user = _context4.v;
          if (user) {
            _context4.n = 3;
            break;
          }
          throw createError('No account with that email found', 400);
        case 3:
          resetToken = crypto.randomBytes(20).toString('hex');
          user.resetPasswordToken = resetToken;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          _context4.n = 4;
          return user.save();
        case 4:
          emitter.emit('User.forgotpassword', user, resetToken);
          res.status(200).json({
            message: 'Password reset email sent'
          });
          _context4.n = 6;
          break;
        case 5:
          _context4.p = 5;
          _t6 = _context4.v;
          next(_t6);
        case 6:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 5]]);
  }));
  return function forgotPassword(_x0, _x1, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
export var resetPassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res, next) {
    var _req$body3, token, password, user, _t7;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _req$body3 = req.body, token = _req$body3.token, password = _req$body3.password;
          if (!(!token || !password)) {
            _context5.n = 1;
            break;
          }
          throw createError('Token and new password are required', 400);
        case 1:
          _context5.n = 2;
          return User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {
              $gt: Date.now()
            }
          });
        case 2:
          user = _context5.v;
          if (user) {
            _context5.n = 3;
            break;
          }
          throw createError('Invalid or expired reset token', 400);
        case 3:
          user.password = password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          _context5.n = 4;
          return user.save();
        case 4:
          res.json({
            message: 'Password reset successful'
          });
          _context5.n = 6;
          break;
        case 5:
          _context5.p = 5;
          _t7 = _context5.v;
          next(_t7);
        case 6:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 5]]);
  }));
  return function resetPassword(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();