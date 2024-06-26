import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Pressable, Text, View, Modal } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { themes } from "../functions/colorThemes";

const Language = ({
  showForm,
  setShowForm,
  save,
  languageCode,
  languageValue,
  setLanguageCode,
  setLanguageValue,
  i18nLang,
  themeName,
}) => {
  const styles = getStyles(themeName);

  const [currentLanguageCode, setCurrentLanguageCode] = useState(null);
  const [currentLanguageValue, setCurrentLanguageValue] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const languageList = [
    { label: "English", enLabel: "English", value: "1", code: "en" },
    { label: "हिंदी", enLabel: "Hindi", value: "2", code: "hi" },
    { label: "বাংলা", enLabel: "Bengali", value: "3", code: "bn" },
    { label: "Español", enLabel: "Spanish", value: "4", code: "es" },
    { label: "Français", enLabel: "French", value: "5", code: "fr" },
    { label: "Русский", enLabel: "Russian", value: "6", code: "ru" },
    { label: "日本語", enLabel: "Japanese", value: "7", code: "ja" },
  ];

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      setCurrentLanguageValue(languageValue);
      setCurrentLanguageCode(languageCode);
    }, [languageValue, languageCode])
  );

  const saveLanguage = async () => {
    setLanguageCode(currentLanguageValue);
    setLanguageValue(currentLanguageCode);
    await save("languageValue", currentLanguageValue, false);
    await save("languageCode", currentLanguageCode, false);
    setShowForm(false);
  };

  const handleCloseClick = () => {
    setShowForm(false);
    setCurrentLanguageValue(null);
    setCurrentLanguageValue(null);
  };

  const handleSelectLanguage = useCallback((item) => {
    setCurrentLanguageValue(item.value);
    setCurrentLanguageCode(item.code);
    setSearchQuery("");
  }, []);

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
            <Text style={styles.selectLanguage}>
              {i18nLang.t("selectLanguage")}
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              containerStyle={{
                backgroundColor: themes[themeName].primarycolor1,
                borderRadius: 3,
                elevation: 3,
              }}
              activeColor={themes[themeName].secondaryColor1}
              data={languageList}
              dropdownPosition="top"
              // search={false}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={i18nLang.t("language") + "..."}
              // searchPlaceholder={i18nLang.t("searchPlaceholder")}
              value={currentLanguageValue}
              onChange={handleSelectLanguage}
              onChangeText={(query) => {
                setSearchQuery(query);
              }}
              renderItem={renderItem}
            />
          </View>
          <View style={styles.formButtonsContainer}>
            <Pressable style={styles.closeButton} onPress={handleCloseClick}>
              {({ pressed }) => (
                <Text
                  style={[
                    {
                      color: pressed
                        ? themes[themeName].underlayColor4
                        : themes[themeName].primarycolor1,
                    },
                    styles.closeButtonText,
                  ]}
                >
                  {i18nLang.t("closeBtn")}
                </Text>
              )}
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? themes[themeName].underlayColor4
                    : themes[themeName].primarycolor1,
                },
                styles.confirmButton,
              ]}
              onPress={saveLanguage}
            >
              <Text style={styles.confirmButtonText}>
                {i18nLang.t("saveBtn")}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStyles = (themeName) => {
  return StyleSheet.create({
    formContainer: {
      position: "absolute",
      bottom: 0,
      width: "93%",
      marginLeft: "3.5%",
      marginBottom: "2%",
      flex: 1,
      justifyContent: "space-around",
      backgroundColor: themes[themeName].bgColor1,
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
      color: themes[themeName].primarycolor1,
    },
    dropdown: {
      width: "50%",
      height: "50%",
      backgroundColor: themes[themeName].primarycolor1,
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
      color: themes[themeName].bgColor1,
    },
    placeholderStyle: {
      fontSize: 16,
      color: themes[themeName].bgColor1,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: themes[themeName].bgColor1,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: themes[themeName].bgColor1,
      borderColor: themes[themeName].bgColor1,
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
      color: themes[themeName].bgColor1,
    },
  });
};

export default Language;
