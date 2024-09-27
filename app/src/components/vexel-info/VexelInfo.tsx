import { View, Text, Image, Dimensions } from "react-native";
import VexelPng from "../../../../assets/vexel-variant-info.png";

const { width } = Dimensions.get("window");
const height = (width / 100) * 60;

const VexelInfo = () => {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={{ color: "#272728", fontSize: 16, fontWeight: "600" }}>
        Вы можете выбрать один из вариантов оплаты:
      </Text>

      <Text
        style={{
          marginTop: 24,
          marginBottom: 5,
          color: "#272728",
          fontSize: 14,
          fontWeight: "600",
        }}
      >
        Оплата наличными
      </Text>
      <Text
        style={{
          color: "#272728",
          fontSize: 12,
          fontWeight: "400",
          lineHeight: 15.6,
        }}
      >
        При выборе варианта оплаты наличными, вы дожидаетесь приезда курьера и
        передаёте ему сумму за товар в рублях. Курьер предоставляет товар,
        который можно осмотреть на предмет повреждений, соответствие указанным
        условиям. Покупатель подписывает сопроводительные документы, вносит
        денежные средства и получает чек.
      </Text>

      <Text
        style={{
          marginTop: 24,
          marginBottom: 5,
          color: "#272728",
          fontSize: 14,
          fontWeight: "600",
        }}
      >
        Оплата банковской картой
      </Text>
      <Text
        style={{
          color: "#272728",
          fontSize: 12,
          fontWeight: "400",
          lineHeight: 15.6,
        }}
      >
        Для выбора оплаты товара с помощью банковской карты на соответствующей
        странице необходимо нажать кнопку «Оплатить банковской картой». Оплата
        происходит через ПАО СБЕРБАНК с использованием Банковских карт следующих
        платежных систем:
      </Text>

      <Image
        source={VexelPng}
        style={{
          width: width - 80,
          height: 33,
          resizeMode: "cover",
          marginTop: 8,
        }}
      />

      <Text
        style={{
          marginTop: 24,
          marginBottom: 5,
          color: "#898E9F",
          fontSize: 14,
          fontWeight: "600",
        }}
      >
        ОПИСАНИЕ ВОЗВРАТА УСЛУГИ
      </Text>
      <Text
        style={{
          color: "#272728",
          fontSize: 12,
          fontWeight: "400",
          lineHeight: 15.6,
        }}
      >
        Возврат переведенных средств, производится на Ваш банковский счет в
        течение 5-30 рабочих дней (срок зависит от Банка, который выдал Вашу
        банковскую карту).
      </Text>

      <Text
        style={{
          marginTop: 24,
          marginBottom: 5,
          color: "#898E9F",
          fontSize: 14,
          fontWeight: "600",
        }}
      >
        ОПИСАНИЕ ПРОЦЕССА ПЕРЕДАЧИ ДАННЫХ
      </Text>
      <Text
        style={{
          color: "#272728",
          fontSize: 12,
          fontWeight: "400",
          lineHeight: 15.6,
        }}
      >
        Для оплаты (ввода реквизитов Вашей карты) Вы будете перенаправлены на
        платежный шлюз ПАО СБЕРБАНК. Соединение с платежным шлюзом и передача
        информации осуществляется в защищенном режиме с использованием протокола
        шифрования SSL. В случае если Ваш банк поддерживает технологию
        безопасного проведения интернет-платежей Verified By Visa, MasterCard
        SecureCode, MIR Accept, J-Secure для проведения платежа также может
        потребоваться ввод специального пароля. Настоящий сайт поддерживает
        256-битное шифрование. Конфиденциальность сообщаемой персональной
        информации обеспечивается ПАО СБЕРБАНК. Введенная информация не будет
        предоставлена третьим лицам за исключением случаев, предусмотренных
        законодательством РФ. Проведение платежей по банковским картам
        осуществляется в строгом соответствии с требованиями платежных систем
        МИР, Visa Int., MasterCard Europe Sprl, JCB.
      </Text>
    </View>
  );
};

export default VexelInfo;
