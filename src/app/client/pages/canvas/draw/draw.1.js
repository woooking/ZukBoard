import {fabric} from 'fabric'
import { plugins } from './plugins'
import { genKey } from './plugins/util'
fabric.Canvas.prototype.getObjectById = function (id) {
  var objs = this.getObjects()
  for (var i = 0, len = objs.length; i < len; i++) {
    if (objs[i].id === id) {
      return objs[i]
    }
  }
  return 0
}
class Draw {
  constructor(vm, selector, width, height) {
    this.current = 'brush'
    this.layerDraw = new fabric.Canvas('layer-draw', { width: 900, height: 600 })
    this.layerDraw.isDrawingMode = true
    console.log(this.layerDraw)
    this.layerDraw.on('path:created', function (e) {
      if (e.path.id === undefined) {
        e.path.set('id', genKey())
      }
      console.log(e.path.toJSON(['id']))
      vm.sync('brush', '123', e.path.toJSON(['id']), true)
    })
    // let isDown = false
    // this.layerDraw.on('mouse:up', function (e) {
    //   isDown = false
    // })
    // this.layerDraw.on('mouse:move', function (e) {
    //   if (!isDown) return
    //   console.log(e)
    // })
    // this.layerDraw.on('mouse:down', function (e) {
    //   isDown = true
    // })
    this.layerDraw.on('object:moving', function (e) {
      console.log(e.target.toJSON(['id']))
      vm.sync('brush', '123', e.target.toJSON(['id']), true)
    })
    this.layerDraw.on('object:modified', function (e) {
      console.log(e.target.toJSON(['id']))
      vm.sync('brush', '123', e.target.toJSON(['id']), true)
    })
  }
  init() {
    // this.layerCover = this._scene.layer('canvas-cover', {
    //   // renderMode: 'repaintAll'
    // })
    // this.layerDraw = this._scene.layer('canvas-draw', {
    //   renderMode: 'repaintAll'
    // })
    // this.registerEvents()
    this.callInit()
  }
  registerEvents() {
    // this.layerDraw.on('mouseup', (ev) => {
    //   if (this.current === 'uploadImg' ||
    //   this.current === 'choose') return
    //   this.drawing = false
    //   this.emitEvents('mouseup', 'draw', ev)
    //   ev.stopDispatch()
    // })
    // this.layerDraw.on('mousedown', (ev) => {
    //   this.drawing = true
    //   this.emitEvents('mousedown', 'draw', ev)
    // })
    // this.layerDraw.on('mousemove', (ev) => {
    //   if (this.current === 'uploadImg' ||
    //     this.current === 'choose') return
    //   // ev.stopImmediatePropagation()
    //   // ev.preventDefault()
    //   this.emitEvents('mousemove', 'cover', ev)
    //   if (!this.drawing) return
    //   this.emitEvents('mousemove', 'draw', ev)
    // }, true)
    // document.body.addEventListener('mouseup', (ev) => {
    //   if (this.current === 'uploadImg' ||
    //     this.current === 'choose') return
    //   if (!this.drawing) return
    //   this.drawing = false
    //   // this.emitEvents('mouseup', 'draw', ev)
    // })
  }
  emitEvents(event, canvas, ev) {
    // Object.keys(plugins).forEach(key => {
    //   if (key !== this.current) {
    //     return
    //   }
    //   plugins[key][canvas][event] && plugins[key][canvas][event].call(this.vm, ev, canvas === 'draw' ? this.layerDraw : this.layerCover)
    // })
  }
  clear() {
    // let canvas = document.querySelector('[data-layer-id=canvas-draw]')
    // this.layerDraw.clearContext(canvas.getContext('2d'))
    // this.layerDraw.clearContext(this.layerDraw.context)
    // const layerDraw = this.layerDraw
    // function remove() {
    //   if (layerDraw.children.length === 0) return
    //   layerDraw.children.forEach(item => {
    //     item.remove()
    //   })
    //   remove()
    // }
    // remove()
    // this.layerDraw.clear()
    // Object.keys(plugins).forEach(key => {
    //   plugins[key].clear && plugins[key].clear.call(this.vm, this.layerDraw, this.layerCover)
    // })
    // // this.vm.renderList = []
    // this.vm.zindex = 0
    // plugins[opt.key].clear && plugins[opt.key].clear.call(this.vm)
    // this.layerDraw.\.context.clearRect(0, 0, 1000, 500)
  }
  callInit() {
    Object.keys(plugins).forEach(key => {
      plugins[key].init && plugins[key].init.call(this.vm, this.layerDraw, this.layerCover)
    })
  }
  callUnInstall(key) {
    // if (key) {
    //   plugins[key].uninstall && plugins[key].uninstall.call(this.vm, this.layerDraw, this.layerCover)
    //   return
    // }
    // Object.keys(plugins).forEach(key => {
    //   plugins[key].uninstall && plugins[key].uninstall.call(this.vm, this.layerDraw, this.layerCover)
    // })
  }
  syncBoard(opt) {
    const canvas = this.layerDraw
    let obj = canvas.getObjectById(opt.data.id)
    if (obj) {
      obj.set(opt.data)
      canvas.renderAll()
      canvas.calcOffset()
      return
    }
    fabric.util.enlivenObjects([opt.data], (objects) => {
      // var origRenderOnAddRemove = this.layerDraw.renderOnAddRemove;
      // canvas.renderOnAddRemove = false;
      objects.forEach(function (o) {
        canvas.add(o)
      })
      // canvas.renderOnAddRemove = origRenderOnAddRemove;
      // canvas.renderAll();
    })
    // plugins[opt.key].syncBoard.call(this.vm, opt, this.layerDraw)
    // var obj = this.layerDraw.getObjectById(opt.data.id)
    // obj.set(opt.data)
    // this.layerDraw.renderAll()
    // this.layerDraw.calcOffset()
  }
  redo(opt) {
    // plugins[opt.key].redo.call(this.vm, opt, this.layerDraw)
  }
  undo(opt) {
    // plugins[opt.key].undo.call(this.vm, opt, this.layerDraw)
  }
  syncBoardWithPoint(opt) {
    // plugins[opt.key].syncBoardWithPoint.call(this.vm, opt, this.layerDraw)
  }
  setKey(key) {
    if (key === this.current) {
      return
    }
    // this.callUnInstall(this.current)
    this.current = key
    if (key === 'brush') {
      this.layerDraw.isDrawingMode = true
      return
    }
    this.layerDraw.isDrawingMode = false
  }
}

// function resizeCanvas() {
//   var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
//   var height = (window.innerHeight > 0) ? window.innerHeight : screen.height
//   var canvas = document.getElementById('canvas')
//   canvas.width = width
//   canvas.height = height
// }

export default Draw
