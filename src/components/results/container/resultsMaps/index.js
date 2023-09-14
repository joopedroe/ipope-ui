import {useCallback, useState, useEffect} from 'react';
import {

  Box, InputLabel, FormControl, SvgIcon, Typography, Unstable_Grid2 as Grid,
} from '@mui/material';
import {getSearch, getResultsMaps} from "../../config/actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, Circle } from "react-leaflet";
import { Select, Space } from 'antd';
import MenuItem from "@mui/material/MenuItem";
import "leaflet/dist/leaflet.css";



export const ResultsMaps = (props) => {
  const [fields,setFields] = useState([]);
  const [fieldSelected,setFieldSelected] = useState({});
  const [results, setResults] = useState([])
  const [location, setLocation] = useState([-12.789135, -46.508822]);
  const dispatch = useDispatch();
  const {id} = useParams();

  const colors = [ "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Pink", "Brown", "Black", "White", "Gray", "Gold", "Silver", "Turquoise", "Indigo", "Magenta", "Cyan", "Lilac", "Aqua", "Salmon" ]


  const search = useSelector(state => state.results.searchResult);

  const fieldData = useSelector(state => state.results.resultsMaps);


  const renderField = (field) => {
    switch (field.dataType) {
      case 1:
      case 2:
      case 4:
      case 3:

    }
  }

  useEffect(() => {
    if (id) {
      dispatch(getSearch(id));
    }
  }, [])

  useEffect(() => {
    if (search.sections.length) {
      const newFields = [];
      search.sections.map((section) => {
        section.fields.map((fieldItem) => {
          newFields.push(fieldItem);
        })
      })
      setFields(newFields)
    }
  }, [search])

  useEffect(() => {
    if(fieldData.length){
      console.log('fieldData')
      //setLocation([fieldData[0].lat,fieldData[0].lgt]);
    }
    console.log('Colors',fieldSelected)
    const data = fieldData.map(res=>({...res, color: fieldSelected[res.values[0]] , name:res.values[0]}))
    setResults(data)
  }, [fieldData])

  const handleChange = (value) =>{
    const fieldSelect = fields.filter(item=>(item.id === value));
    if(fieldSelect){
      const newColorsField = {};

      fieldSelect[0].options.map((option,index)=>{
        newColorsField[option.value] = colors[index];
      })
      setFieldSelected(newColorsField);
    }
    dispatch(getResultsMaps({searchId:id, fieldId:value}));

  }





  const data = [
      { id: 1, name: "Local 1", lat: 51.505, lon: -0.09 },
      { id: 2, name: "Local 2", lat: 51.51, lon: -0.1 },
      { id: 3, name: "Local 3", lat: 51.515, lon: -0.11 },
      // Adicione mais dados conforme necessário
    ]

  const fillBlueOptions = { fillColor: 'blue' }
  const fillRedOptions = { fillColor: 'red' }
  const greenOptions = { color: 'green', fillColor: 'green' }
  const purpleOptions = { color: 'purple' }
  const center = [51.505, -0.09]

  const position = [-12.789135, -46.508822]

  console.log(results)
  return (
    <Box>
      <h1>{search.name}</h1>
      <Select
        placeholder="Selecione um campo para vizualizar os dados"
        style={{ width: '100%', marginBottom:'20px' }}
        onChange={handleChange}
        options={fields.map((field) => ({ label: field.question, value: field.id }))}
      />

      <div style={{display:'flex', gap:'20px' }}>
        {
          fieldSelected && Object.keys(fieldSelected).map((item,index)=>(
            <div style={{display:'flex', alignItems:'center', marginBottom:'10px', }}>
              <div style={{width:'20px', height:'20px', backgroundColor:fieldSelected[item], marginRight:'10px'}}></div>
              <span>{item}</span>
            </div>
          ))
        }
      </div>

    <MapContainer style={{ height: "600px" }}  center={location} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LayerGroup>
        {
          results.map((item,index)=>(
            <Circle center={[item.lat,item.lng]} color={item.color} radius={10} stroke={true} />
          ))
        }

        <Circle
          center={[51.515,-0.01]}
          pathOptions={fillRedOptions}
          radius={100}
          stroke={false}
        />
        <LayerGroup>
          <Circle
            center={[51.51, -0.08]}
            pathOptions={greenOptions}
            radius={100}
          />
        </LayerGroup>
      </LayerGroup>
    </MapContainer>
    </Box>
  );
};
