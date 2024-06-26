import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Modal,
  TextInput,
} from "react-native";
import { themes } from "../functions/colorThemes";

const Account = ({
  themeName,
  showForm,
  setShowForm,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  i18nLang,
  save,
}) => {
  const styles = getStyles(themeName);

  const [currentFN, setCurrentFN] = useState(null);
  const [currentLN, setCurrentLN] = useState(null);

  const handleCloseClick = () => {
    setShowForm(false);
    setCurrentFN(firstName);
    setCurrentLN(lastName);
  };

  const saveAccount = async () => {
    setFirstName(currentFN);
    setLastName(currentLN);
    await save("firstName", currentFN, false);
    await save("lastName", currentLN, false);
    setShowForm(false);
  };

  useFocusEffect(
    useCallback(() => {
      setCurrentFN(firstName);
      setCurrentLN(lastName);
    }, [firstName, lastName])
  );

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
            <TextInput
              style={styles.nameInput}
              value={currentFN}
              placeholder={i18nLang.t("firstName")}
              placeholderTextColor={themes[themeName].placeholderColor1}
              onChangeText={(text) => setCurrentFN(text)}
            />
            <TextInput
              style={styles.nameInput}
              value={currentLN}
              placeholder={i18nLang.t("lastName")}
              placeholderTextColor={themes[themeName].placeholderColor1}
              onChangeText={(text) => setCurrentLN(text)}
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
              onPress={saveAccount}
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
      marginTop: "2%",
      marginBottom: "5%",
    },
    nameInput: {
      color: themes[themeName].primarycolor1,
      fontSize: 16,
      width: "45%",
      borderBottomWidth: 0.2,
      borderColor: "black",
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

export default Account;
