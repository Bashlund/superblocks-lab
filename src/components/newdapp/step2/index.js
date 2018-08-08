import { h, Component } from 'preact';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import style from '../style';

export default class Step2 extends Component {

    state = {
        categorySelected: 0,
        templateSelected: null
    }

    onCreateProjectHandle = () => {
        // TODO
    }

    back = () => {
        this.props.onBackPress();
    }

    onCategorySelected(id) {
        this.setState({
            categorySelected: id
        })
    }

    onTemplateSelected = (template) => {
        this.setState({
            templateSelected: template
        })
    }

    render() {
        let { categories, templates } = this.props;
        let { categorySelected, templateSelected } = this.state;

        return(
            <div className={classNames([style.newDapp, "modal"])}>
                <div class={style.step2}>
                    <div class={style.header}>
                        <div class={style.title}>Select Template</div>
                    </div>
                    <div class={classNames([style.area, style.container])}>
                        <div class={style.categoriesArea}>
                            <div class={style.categoriesTitle}>Categories</div>
                                <ul>
                                    {
                                        categories.map(category =>
                                            <li class={categorySelected == category.id ? style.selected : null}>
                                                <TemplateCategory
                                                    title={category.name}
                                                    onCategorySelected={() => this.onCategorySelected(category.id)}/>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        <div class={style.templateListArea}>
                            <GridLayout
                                templates={templates}
                                onTemplateSelected={this.onTemplateSelected}
                                templateSelectedId={templateSelected ? templateSelected.id : null}/>
                        </div>
                    </div>
                    <div class={style.footer}>
                        <button onClick={this.back} class="btn2 noBg">Back</button>
                        <button onClick={this.createProject} disabled={!templateSelected} class="btn2">Create Project</button>
                    </div>
                </div>
            </div>
        );
    }
}

Step2.proptypes = {
    categories: Proptypes.array.isRequired,
    templates: Proptypes.array.isRequired,
    onBackPress: Proptypes.func.isRequired,
}

const TemplateCategory = ({ onCategorySelected, title } = props) => (
    <div onClick={onCategorySelected}>{title}</div>
)

TemplateCategory.protoTypes = {
    title: Proptypes.string.isRequired,
    onCategorySelected: Proptypes.func.isRequired,
}

const GridLayout = ({ templates, onTemplateSelected, templateSelectedId } = props) => (
    <div class={style.gridLayout}>
        <div id="mainContent" className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
        { templates.map((template) => (
                <TemplateLayout
                    image={template.image}
                    name={template.name}
                    description={template.description}
                    selected={template.id ==  templateSelectedId}
                    onTemplateSelected={() => onTemplateSelected(template)}
                />
        ))}
        </div>
    </div>
);

GridLayout.protoTypes = {
    templates: Proptypes.array.isRequired,
    onCategorySelected: Proptypes.func.isRequired,
    templateSelectedId: Proptypes.number,
}

const TemplateLayout = ({ image, name, description, selected, onTemplateSelected } = props) => (
    <div onClick={onTemplateSelected} class={classNames([style.templateLayout], { [style.selected]: selected })}>
        <img src={image} width="300"/>
        <div class={style.title}>{name}</div>
        <div class={style.description}>{description}</div>
    </div>
);

TemplateLayout.protoTypes = {
    image: Proptypes.string.isRequired,
    name: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
    selected: Proptypes.bool.isRequired,
    onTemplateSelected: Proptypes.func.isRequired
}