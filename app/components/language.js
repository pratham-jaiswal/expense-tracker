import { useEffect, useState } from "react";
import { StyleSheet, Pressable, Text, View, Modal } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const Language = ({ showForm, setShowForm }) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [currentLanguageValue, setCurrentLanguageValue] = useState(null);

  const languageList = [
    { label: "English", value: "1", code: "en" },
    { label: "हिन्दी", value: "2", code: "hi" },
    { label: "বাংলা", value: "3", code: "bn" },
    { label: "Español", value: "4", code: "es" },
    { label: "Français", value: "5", code: "fr" },
    { label: "Русский", value: "6", code: "ru" },
    { label: "日本語", value: "7", code: "ja" },
  ];

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const handleCloseClick = () => {
    setShowForm(false);
    setCurrentLanguage(null);
    setCurrentLanguageValue(null);
  };

  return (
    <View style={styles.container}>
      <Modal
        style={styles.modalContainer}
        animationType="slide"
        transparent={true}
        visible={showForm}
        onRequestClose={() => {
          setShowForm(!showForm);
        }}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.selectLanguage}>Select Language:</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              containerStyle={{
                backgroundColor: "#FFE6E6",
                borderRadius: 7,
                elevation: 3,
              }}
              data={languageList}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Language..."
              searchPlaceholder="Search..."
              value={currentLanguageValue}
              onChange={(item) => {
                setCurrentLanguageValue(item.value);
                setCurrentLanguage(item.label);
              }}
              renderItem={renderItem}
            />
          </View>
          <View style={styles.formButtonsContainer}>
            <Pressable style={styles.closeButton} onPress={handleCloseClick}>
              {({ pressed }) => (
                <Text
                  style={[
                    { color: pressed ? "#f5d7d7" : "#FFE6E6" },
                    styles.closeButtonText,
                  ]}
                >
                  Close
                </Text>
              )}
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#f5d7d7" : "#FFE6E6",
                },
                styles.confirmButton,
              ]}
              onPress={() => console.log("Confirm")}
            >
              <Text style={styles.confirmButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    position: "absolute",
    bottom: 0,
    width: "93%",
    marginLeft: "3.5%",
    marginBottom: "2%",
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#7469B6",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    elevation: 7,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "7%",
  },
  selectLanguage: {
    fontSize: 16,
    color: "#FFE6E6",
  },
  dropdown: {
    width: "50%",
    height: "50%",
    backgroundColor: "#FFE6E6",
    borderRadius: 25,
    padding: 12,
    elevation: 3,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: "#7469B6",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#7469B6",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#7469B6",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#7469B6",
    borderColor: "#7469B6",
    borderRadius: 7,
  },
  formButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: "3%",
  },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "3%",
    paddingRight: "7%",
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  confirmButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "3%",
    paddingHorizontal: "7%",
    borderRadius: 4,
    elevation: 3,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7469B6",
  },
});

export default Language;
