import { Events, scroller } from 'react-scroll'

export const scrollTo = (componentId, onScrolled) => {
    Events.scrollEvent.register('end', (to, element) => {
        onScrolled(to, element);
  
        Events.scrollEvent.remove('end');
      });
  
      scroller.scrollTo(componentId, {
        duration: 2000,
        smooth: 'easeInOutQuint'
      });
};
  