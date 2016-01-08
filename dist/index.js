'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glShader = require('@vaalentin/gl-shader');

var _glShader2 = _interopRequireDefault(_glShader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Program
 */

var Program = function () {
  /**
   * @constructs Program
   * @param {WebGLRenderingContext} gl
   * @param {Shader|string} vert - vertex shader
   * @param {Shader|string} frag - fragment shader
   */

  function Program(gl, vert, frag) {
    _classCallCheck(this, Program);

    this.gl = gl;

    if (typeof vert === 'string') {
      vert = new _glShader2.default(this.gl, this.gl.VERTEX_SHADER, vert);
    }

    if (typeof frag === 'string') {
      frag = new _glShader2.default(this.gl, this.gl.FRAGMENT_SHADER, frag);
    }

    this.vertShader = vert;
    this.fragShader = frag;

    this.program = this.gl.createProgram();

    this.gl.attachShader(this.program, this.vertShader.shader);
    this.gl.attachShader(this.program, this.fragShader.shader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      throw 'Error while linking program';
    }

    this._attributes = {};
    this._uniforms = {};
  }

  /**
   * @method addAttribute
   * @public
   * @param {string} name
   * @param {uint} size
   * @param {uint} type
   */

  _createClass(Program, [{
    key: 'addAttribute',
    value: function addAttribute(name, size, type) {
      var location = this.gl.getAttribLocation(this.program, name);

      this._attributes[name] = {
        location: location,
        type: type,
        size: size
      };

      this.gl.enableVertexAttribArray(location);
    }

    /**
     * @method setAttributePointer
     * @public
     * @param {string} name
     */

  }, {
    key: 'setAttributePointer',
    value: function setAttributePointer(name) {
      var _attributes$name = this._attributes[name];
      var location = _attributes$name.location;
      var size = _attributes$name.size;
      var type = _attributes$name.type;

      this.gl.vertexAttribPointer(location, size, type, false, 0, 0);
    }

    /**
     * @method addUniform
     * @public
     * @param {string} name
     * @param {uint} type
     */

  }, {
    key: 'addUniform',
    value: function addUniform(name, type) {
      var location = this.gl.getUniformLocation(this.program, name);

      this._uniforms[name] = {
        location: location,
        type: type
      };
    }

    /**
     * @method setUniform
     * @public
     * @param {string} name
     * @param {any} value
     */

  }, {
    key: 'setUniform',
    value: function setUniform(name, value) {
      var _uniforms$name = this._uniforms[name];
      var location = _uniforms$name.location;
      var type = _uniforms$name.type;

      switch (type) {
        case this.gl.INT:
          this.gl.uniform1i(location, value);
          break;

        case this.gl.INT_VEC2:
          this.gl.uniform2iv(location, value);
          break;

        case this.gl.INT_VEC3:
          this.gl.uniform3iv(location, value);
          break;

        case this.gl.INT_VEC4:
          this.gl.uniform4iv(location, value);
          break;

        case this.gl.FLOAT:
          this.gl.uniform1f(location, value);
          break;

        case this.gl.FLOAT_VEC2:
          this.gl.uniform2fv(location, value);
          break;

        case this.gl.FLOAT_VEC3:
          this.gl.uniform3fv(location, value);
          break;

        case this.gl.FLOAT_VEC4:
          this.gl.uniform4fv(location, value);
          break;

        case this.gl.FLOAT_MAT2:
          this.gl.uniformMatrix2fv(location, false, value);
          break;

        case this.gl.FLOAT_MAT3:
          this.gl.uniformMatrix3fv(location, false, value);
          break;

        case this.gl.FLOAT_MAT4:
          this.gl.uniformMatrix4fv(location, false, value);
          break;
      }
    }

    /**
     * @method bind
     * @public
     */

  }, {
    key: 'bind',
    value: function bind() {
      this.gl.useProgram(this.program);
    }

    /**
     * @method dispose
     * @public
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      this.gl.deleteProgram(this.program);
      this.program = null;

      this.vertShader.dispose();
      this.vertShader = null;

      this.fragShader.dispose();
      this.fragShader = null;

      this._attributes = null;
      this._uniforms = null;

      this.gl = null;
    }
  }]);

  return Program;
}();

exports.default = Program;
