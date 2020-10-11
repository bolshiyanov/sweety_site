import { Events, scroller } from 'react-scroll'

export const scrollTo = (componentId, onScrolled) => {
    Events.scrollEvent.register('end', (to, element) => {
        onScrolled(to, element);
  
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo(componentId, {
        duration: 100 + document.getElementById(componentId).getBoundingClientRect().y < 0 ? 2000 : 0,
        smooth: 'easeInOutQuint'
      });
};
  