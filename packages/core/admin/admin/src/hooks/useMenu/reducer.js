/* eslint-disable consistent-return */
import produce from 'immer';
import adminPermissions from '../../permissions';

const initialState = {
  generalSectionLinks: [
    {
      icon: 'list',
      intlLabel: {
        id: 'app.components.LeftMenuLinkContainer.listPlugins',
        defaultMessage: 'Plugins',
      },
      to: '/list-plugins',
      permissions: adminPermissions.marketplace.main,
    },
    {
      icon: 'shopping-basket',
      intlLabel: {
        id: 'app.components.LeftMenuLinkContainer.installNewPlugin',
        defaultMessage: 'Marketplace',
      },
      to: '/marketplace',
      permissions: adminPermissions.marketplace.main,
    },
    {
      icon: 'cog',
      intlLabel: {
        id: 'app.components.LeftMenuLinkContainer.settings',
        defaultMessage: 'Settings',
      },
      to: '/settings',
      // Permissions of this link are retrieved in the init phase
      // using the settings menu
      permissions: [],
      notificationsCount: 0,
    },
  ],
  pluginsSectionLinks: [],
  isLoading: true,
};

const reducer = (state = initialState, action) =>
  produce(state, draftState => {
    switch (action.type) {
      case 'SET_SECTION_LINKS': {
        const { authorizedGeneralSectionLinks, authorizedPluginSectionLinks } = action.data;
        draftState.generalSectionLinks = authorizedGeneralSectionLinks;
        draftState.pluginsSectionLinks = authorizedPluginSectionLinks;
        break;
      }
      case 'UNSET_IS_LOADING': {
        draftState.isLoading = false;
        break;
      }
      default:
        return draftState;
    }
  });

export default reducer;
export { initialState };