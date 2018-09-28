import React, { PureComponent } from 'react';
import './strokeorder.css';
import availableKanjiFiles from './available_kanji_files.json'

function uriForKanji(kanji) {
  let fileCodeStringLength = 5;
  let unicodeString = kanji.codePointAt(0).toString(16);
  let fillZeroes = fileCodeStringLength - unicodeString.length;
  let fileCode = new Array(fillZeroes + 1).join('0') + unicodeString;
  let fileName = fileCode + '_anim.gif';

  if (availableKanjiFiles[fileName]) {
    return `https://raw.githubusercontent.com/mistval/kotoba/master/resources/images/kanjianimations/${fileName}`;
  }

  return undefined;
}

class TextEntry extends PureComponent {
  handleChange = event => {
    this.props.textChange(event.target.value);
  };

  render() {
    return (
      <div class="row p-5" ml-5>
        <form>
          <div class="form-group input-group-lg">
            <label class="bmd-label-static" htmlFor="kanjiInput" id="kanjiLabel">Enter Kanji</label>
            <input id="kanjiInput" class="form-control emphasized-form-control" onChange={this.handleChange} value={this.props.value} autofocus />
          </div>
        </form>
      </div>
    );
  }
}

function createKanjiCards(kanjis) {
  return kanjis.map((kanji, index) => {
    const uri = uriForKanji(kanji);
    return (
      <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-4 pb-4" key={index}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              <a className="card-title" href={`https://jisho.org/search/${encodeURIComponent(kanji)}%23kanji`} target="_blank">
                {kanji}
              </a>
            </h5>
            { uri ?
              (<img class="card-img-bottom" src={uri} alt="kanji stroke order" />) :
              (<p>Unknown kanji</p>)
            }
          </div>
        </div>
      </div>
    );
  }).filter(element => !!element);
}

function KanjiCards(props) {
  return (
    <div class="row pl-5 pr-5">
      {createKanjiCards(props.kanjis)}
    </div>
  );
}

class StrokeOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      kanjis: ['日', '本', '朝', '感', '陶', '礎'],
    };
  }

  handleSearchChange = searchTerm => {
    const kanjis = searchTerm.split('');
    this.setState({
      kanjis,
    });
  }

  render() {
    return (
      <div class="container-fluid" id="kanjiContainer">
        <TextEntry value={this.state.kanjis.join('')} textChange={this.handleSearchChange} />
        <KanjiCards kanjis={this.state.kanjis} />
      </div>
    );
  }
}

export default StrokeOrder;
