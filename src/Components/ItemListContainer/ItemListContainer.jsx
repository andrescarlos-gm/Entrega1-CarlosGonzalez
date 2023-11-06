import "./ItemListContainer.css";


export default function ItemListContainer(props) {

  return (
    <div>
      <div className="bgimg1">
        <div className="caption">
          <span className="border"><p className="typ">{props.greeting}</p></span>
        </div>
      </div>
      <div className="sectioncontainer">
        <div className="section">
          <p>People&apos;s Choice</p>
   <p>&quot;Custom humanoids that are true masterpieces <br/> of engineering and design&quot;,<br /><br /> Quantum Nova.<br /><br /></p>
        <br />
        </div>

      </div>
      <div className="bgimg2">
        <div className="caption2">
          <span className="border2">
          NPU interface developed according <br/>to the AIS 2100-XI regulation of<br/> the International Association for Human-Robot Safety (AMSHR),<br/> which ensures the well-being of humans and automatons.
          </span>

        </div>
      </div>
      <div className="sectioncontainer2">

        <div className="section2">
          
          <p>
          <br /><br /><br />
          <br /><br /><br />
            Discover the perfect symbiosis between the latest innovation and
            personalized luxury, where technological excellence meets
            the most exquisite style.
          </p>
        </div>
        </div>
    </div>
  );
}