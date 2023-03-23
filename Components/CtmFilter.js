import { FlatList, Text, TouchableOpacity } from "react-native";

import Styles from "../Providers/Styles";

export default function CtmFilter(props) {
  const { values, setter, categories } = {
    values: [],
    setter: () => {},
    categories: [],
    ...props,
  };

  const toggleButton = (category) => {
    const index = values.indexOf(category);
    if (index != -1) {
      values.splice(index, 1);
      setter([...values]);
    } else {
      values.push(category);
      setter([...values]);
    }
  };

  const renderItem = ({ item: { category } }) => {
    return (
      <TouchableOpacity
        onPress={() => toggleButton(category)}
        style={[
          Styles.button,
          values.includes(category) ? Styles.bgGreen : Styles.bgWhite,
        ]}
      >
        <Text
          style={[
            Styles.buttonText,
            values.includes(category) ? Styles.textWhite : Styles.textGray,
          ]}
        >
          {category}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList data={categories} renderItem={renderItem} horizontal={true} />
    </>
  );
}
