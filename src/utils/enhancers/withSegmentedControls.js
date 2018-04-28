import {
  compose,
  withState,
  withProps,
} from 'recompose';

const enhancer = tabs => compose(
  withState('selectedTabIndex', 'changeTab', 0),
  withProps(props => ({
    activeTab: {
      index: props.selectedTabIndex,
      name: tabs[props.selectedTabIndex].name,
      title: tabs[props.selectedTabIndex].title,
    },
    tabs: tabs.map(i => i.title),
  })),
);

export default enhancer;
