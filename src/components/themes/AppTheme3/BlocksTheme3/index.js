import React from 'react';
import PropTypes from 'prop-types';
import { trackWindowScroll, LazyLoadComponent } from 'react-lazy-load-image-component';
import image3_2 from 'images/ImageTheme3_2.jpg';
import Button from 'components/common/Button';
import Block from 'components/Blocks/Block';
import 'components/Blocks/index.scss';

const BlocksTheme3 = ({ data, referrerTitle, scrollPosition }) => {
    return (
        <React.Fragment>
            <div className="blocks">
                {data.length === 0 && (
                    <div className="blocks__empty">
                        <div class="blocks-empty-block-title">Пример подзаголовка</div>
                        <div className="blocks-empty-block-bigimage" style={{ backgroundImage: `URL(${image3_2})` }}></div>
                        <div class="blocks-empty-block-text" > Пример обазаца. Здесь вы можете разместить свой текст.
                        Всего вам доступно более 18 вариантов контента и кнопок с картинками.
                        Возможно автоматическое получение снипетов из Instagram и YouTube. Вы можете комбинировать все виды контента.
            Количество блоков не имеет ограничений.</div>
                        <Button className="blocks-empty-button" onClick={() => { }}> Пример кнопки</Button>
                    </div>
                )}
                {referrerTitle && <div className="ad-label">реклама от @{referrerTitle}</div>}
                {
                    data.map((block) =>
                        <LazyLoadComponent key={block.guid} scrollPosition={scrollPosition} threshold={10}>
                            <Block key={block.guid} {...block} scrollPosition={scrollPosition} />
                        </LazyLoadComponent>)
                }
            </div>
        </React.Fragment>
    );
};

BlocksTheme3.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    referrerTitle: PropTypes.string
};

BlocksTheme3.defaultProps = {
    data: [],
    referrerTitle: ''
};

export default trackWindowScroll(BlocksTheme3);