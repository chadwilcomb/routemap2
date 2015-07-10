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

import LayersPage from './pages/list-layers';
import CreateLayerPage from './pages/create-layer';
import LayerDetailPage from './pages/detail-layer';
import LayerEditPage from './pages/edit-layer';
import LayerDeletePage from './pages/delete-layer';
import Layer from './models/layer'

import ProjectsPage from './pages/list-projects';
import CreateProjectPage from './pages/create-project';
import ProjectDetailPage from './pages/detail-project';
import ProjectEditPage from './pages/edit-project';
import ProjectDeletePage from './pages/delete-project';
import Project from './models/project'

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

    'projects/create': 'createProject',
    'projects/edit/:id': 'editProject',
    'projects/delete/:id': 'deleteProject',
    'projects/:id': 'detailsProject',
    'projects': 'listProjects',

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
    const _this = this;
    if (!app.me.authenticated) {
      this.redirectTo('');
    } else {
      this.renderPage(<MessagePage title='Fetching layers...' />);
      app.me.layers.fetch({
        error (model, response) {
          console.log(response)
          _this.renderPage(<MessagePage title='Error fetching layers.' />);
        },
        success () {
          _this.renderPage(<LayersPage layers={app.me.layers} />);
        }
      });
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
    if (!layer || !layer.features) {
      layer = layer || new Layer({ _id: id });
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
      this.renderPage(<MessagePage title='Fetching layer details...' />);
      layer.fetch({
        error (model, response) {
          console.log(response);
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

  listProjects () {
    const _this = this;
    if (!app.me.authenticated) {
      this.redirectTo('');
    } else {
      this.renderPage(<MessagePage title='Fetching projects...' />);
      app.me.projects.fetch({
        error (model, response) {
          console.log(response)
          _this.renderPage(<MessagePage title='Error fetching projects.' />);
        },
        success () {
          _this.renderPage(<ProjectsPage projects={app.me.projects} />);
        }
      });
    }
  },

  createProject () {
    if (!app.me.authenticated) {
      this.redirectTo('');
    } else {
      const project = new Project();
      this.renderPage(<CreateProjectPage project={project} />);
    }
  },

  editProject (id) {
    const _this = this;
    let project = app.me.projects.get(id);
    if (!project || !project.features) {
      project = project || new Project({ _id: id });
      project.fetch({
        error () {
          _this.renderPage(<MessagePage title='Project not found' />);
        },
        success () {
          if (app.me.layers.length) {
            _this.renderPage(<ProjectEditPage project={project} layers={app.me.layers} />);
          } else {
            app.me.layers.fetch({
              error () {
                _this.renderPage(<MessagePage title='Project not found' />);
              },
              success () {
                _this.renderPage(<ProjectEditPage project={project} layers={app.me.layers} />);
              }
            })
          }
        }
      });
    } else {
      if (app.me.layers.length) {
        _this.renderPage(<ProjectEditPage project={project} layers={app.me.layers} />);
      } else {
        app.me.layers.fetch({
          error () {
            _this.renderPage(<MessagePage title='Project not found' />);
          },
          success () {
            _this.renderPage(<ProjectEditPage project={project} layers={app.me.layers} />);
          }
        })
      }
    }
  },

  deleteProject (id) {
    const _this = this;
    let project = app.me.projects.get(id);
    if (!project) {
      project = new Project({ _id: id });
      project.fetch({
        error () {
          _this.renderPage(<MessagePage title='Project not found' />);
        },
        success () {
          _this.renderPage(<ProjectDeletePage project={project} />);
        }
      });
    } else {
      this.renderPage(<ProjectDeletePage project={project} />);
    }
  },

  detailsProject (id) {
    const _this = this;
    let project = app.me.projects.get(id);
    if (!project) {
      project = new Project({ _id: id });
      this.renderPage(<MessagePage title='Fetching project details...' />);
      project.fetch({
        error (model, response) {
          console.log(response);
          _this.renderPage(<MessagePage title='Project not found' />);
        },
        success () {
          _this.renderPage(<ProjectDetailPage project={project} />);
        }
      });
    } else {
      this.renderPage(<ProjectDetailPage project={project} />);
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
