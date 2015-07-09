import app from 'ampersand-app'
import React from 'react';
import Router from 'ampersand-router';
import qs from 'qs'
import uuid from 'node-uuid'
import xhr from 'xhr'
import Layout from './layout';
import MessagePage from './pages/message';
import PublicPage from './pages/public';
import RegisterUserPage from './pages/register';
import LayersPage from './pages/layers';
import CreateLayerPage from './pages/create-layer';
import LayerDetailPage from './pages/detail-layer';
import LayerEditPage from './pages/edit-layer';
import LayerDeletePage from './pages/delete-layer';
import Layer from './models/layer'

export default Router.extend({

  renderPage(page, opts = {layout: true}) {
    if(opts.layout) {
      page = (
        <Layout me={app.me}>
        {page}
        </Layout>
      );
    }
    React.render(page, document.body)
  },

  routes: {
    '': 'public',
    'register': 'registerUser',
    'layers/create': 'createLayer',
    'layers/edit/:id': 'editLayer',
    'layers/delete/:id': 'deleteLayer',
    'layers/:id': 'detailsLayer',
    'layers': 'listLayers',
    'logout': 'logout',
    '*fourohfour': 'fourOhFour'
  },

  public () {
    if (!app.me.authenticated) {
      this.renderPage(<PublicPage me={app.me}/>, { layout: false });
    } else {
      this.redirectTo('/layers');
    }
  },

  registerUser () {
    if (!app.me.authenticated) {
      this.renderPage(<RegisterUserPage user={app.me}/>, { layout: false });
    } else {
      this.redirectTo('/layers');
    }
  },

  listLayers () {
    if (!app.me.authenticated) {
      this.redirectTo('');
    } else {
      app.me.layers.fetch();
      this.renderPage(<LayersPage layers={app.me.layers} />);
    }
  },

  createLayer () {
    if (!app.me.authenticated) {
      this.redirectTo('');
    } else {
      const layer = new Layer();
      this.renderPage(<CreateLayerPage layer={layer} />);
    }
  },

  editLayer (id) {
    const _this = this;
    let layer = app.me.layers.get(id);
    if (!layer) {
      layer = new Layer({ _id: id });
      layer.fetch({
        error () {
          _this.renderPage(<MessagePage title='Layer not found' />);
        },
        success () {
          _this.renderPage(<LayerEditPage layer={layer} />);
        }
      });
    } else {
      this.renderPage(<LayerEditPage layer={layer} />);
    }

  },

  deleteLayer (id) {
    const _this = this;
    let layer = app.me.layers.get(id);
    if (!layer) {
      layer = new Layer({ _id: id });
      layer.fetch({
        error () {
          _this.renderPage(<MessagePage title='Layer not found' />);
        },
        success () {
          _this.renderPage(<LayerDeletePage layer={layer} />);
        }
      });
    } else {
      this.renderPage(<LayerDeletePage layer={layer} />);
    }
  },

  detailsLayer (id) {
    const _this = this;
    let layer = app.me.layers.get(id);
    if (!layer || !layer.features) {
      layer = layer || new Layer({ _id: id });
      layer.fetch({
        error () {
          _this.renderPage(<MessagePage title='Layer not found' />);
        },
        success () {
          _this.renderPage(<LayerDetailPage layer={layer} />);
        }
      });
    } else {
      this.renderPage(<LayerDetailPage layer={layer} />);
    }
  },

  logout () {
    window.localStorage.clear();
    window.location = '/';
  },

  fourOhFour () {
    this.renderPage(<MessagePage title='Page not found' />);
  }

});
